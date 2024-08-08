#!/bin/sh
set -e # fail script on any individual command failing

STAGE="$1"

ACCOUNT_ID=
USER_POOL_ID=
ROLE_ARN=
REGION=

if [ "$STAGE" = "beta" ]; then
  echo "Onboarding emails for beta"
  ACCOUNT_ID=413330344011
  USER_POOL_ID=us-west-2_YTWCuniwX
  ROLE_ARN=arn:aws:iam::413330344011:role/service-role/Cognito-UserImport-Role
  REGION=us-west-2
elif [ "$STAGE" = "prod" ]; then
  echo "Onboarding emails for prod"
  ACCOUNT_ID=640462035725
  USER_POOL_ID=us-west-2_GgIojE2ji
  ROLE_ARN=arn:aws:iam::640462035725:role/service-role/Cognito-UserImport-Role
  REGION=us-west-2
else
  echo "Invalid stage: $STAGE"
  exit 1
fi

ada credentials update --account=$ACCOUNT_ID --provider=isengard --role=Admin --once

JOB_ID=`aws cognito-idp create-user-import-job \
  --job-name ImportLivenessUsers \
  --user-pool-id $USER_POOL_ID \
  --cloud-watch-logs-role-arn $ROLE_ARN \
  --region $REGION \
  --query "UserImportJob.JobId" \
  --output text`

PRE_SIGNED_URL=`aws cognito-idp describe-user-import-job \
  --user-pool-id $USER_POOL_ID \
  --job-id $JOB_ID \
  --region $REGION \
  --query "UserImportJob.PreSignedUrl" \
  --output text`

curl -v -T ./emails.csv -H "x-amz-server-side-encryption:aws:kms" $PRE_SIGNED_URL

aws cognito-idp start-user-import-job \
  --user-pool-id $USER_POOL_ID \
  --job-id $JOB_ID \
  --region $REGION

echo "Successfully triggered the import job."