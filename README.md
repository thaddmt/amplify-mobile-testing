# RekognitionLivenessSampleWebApp

## Getting Started

1. Create a new brazil workspace with this package

   ```bash
   brazil ws create --name RekognitionLivenessSampleWebApp

   brazil ws use --vs RekognitionLivenessSampleWebApp/development -p RekognitionLivenessSampleWebApp
   ```

2. Navigate to the cloned repository and install dependencies

   ```bash
   npm install
   ```

3. Install Amplify CLI globally

   ```bash
   npm install -g @aws-amplify/cli
   ```

### Local Development

1. For local development, you can use the `beta` environment.

2. Configure credentials for beta account

   ```bash
   ada credentials update --account=413330344011 --provider=isengard --role=Admin --once
   ```

3. Make the region for the credentials as `us-west-2`

   ```bash
   aws configure

   AWS Access Key ID [****]:
   AWS Secret Access Key [****]:
   Default region name [us-west-2]:
   Default output format [None]:
   ```

4. Init the Amplify `beta` environment

   ```bash
    amplify init

    ? Do you want to use an existing environment? Yes
    ? Choose the environment you would like to use: beta
    ? Choose your default editor: Visual Studio Code
    ? Select the authentication method you want to use: AWS profile
    ? Please choose the profile you want to use default
   ```

5. Start the dev server

   ```bash
   npm run dev
   ```

6. For running integration tests locally, create a `cypress.env.json` file similar to `cypress.env.example.json` with your details. Then run the tests

   ```bash
   npm run cypress:open
   ```

### Deployment Testing in Personal AWS Account

1. Onboard your account for PicaPica repository replication by following this [document](https://builderhub.corp.amazon.com/docs/native-aws/developer-guide/codesuite-source-replication.html#set-up-an-iam-role-for-picapica).

2. Create a new branch in the repository for your testing.

3. Configure credentials for your account via `ada`.

4. Create a new Amplify environment

   ```bash
   amplify env add
   ```

5. Push the local Amplify changes (first time)

   ```bash
   amplify push
   ```

6. Add your enivronment specific config to `setup-environment.js`.

7. Push local git changes to the repository. They should now be available in AWS CodeCommit.

8. Connect your branch to the Amplify app in the Amplify Console by following instructions in the console.

9. When creating the service role for console, add these extra permissions:

   ```bash
   "codeartifact:*"
   "sts:GetServiceBearerToken"
   ```

10. Finish the setup to see the build to start. Post successful build, you can see the changes in the deployed url.

## Steps to add new users

1. Install `ada` tool via `toolbox`.

2. Add emails of new users to `emails.csv` file.

3. **IMPORTANT**: Make sure only new users are added. If existing users are added, the import will fail.

4. Run the following command to on-board new users, where stage can be `beta` or `prod`

   ```bash
   ./import_emails.sh <stage>
   ```
# amplify-mobile-testing
