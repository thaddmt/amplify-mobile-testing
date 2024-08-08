export interface SelectOption {
  label: string;
  value: string;
}

export const DEVICE_OPTIONS: SelectOption[] = [
  { label: 'Mobile', value: 'mobile' },
  { label: 'Tablet', value: 'tablet' },
  { label: 'Laptop', value: 'laptop' },
  { label: 'Desktop with webcam', value: 'desktop_with_webcam' },
];

export const BRIGHTNESS_OPTIONS: SelectOption[] = [
  { label: 'Full/Max Brightness', value: 'full' },
  { label: 'Half Brightness', value: 'half' },
  { label: 'Low Brightness', value: 'low' },
];

export const PRESENTATION_ARTIFACT_OPTIONS: SelectOption[] = [
  { value: 'Live', label: 'Live Person' },
  { value: 'Print_Paper', label: 'Print: Photo printed on paper' },
  { value: 'Print_Newspaper', label: 'Print: Photo in Newspaper' },
  { value: 'Print_Magazine', label: 'Print: Photo in magazine' },
  { value: 'Replay_Mobile', label: 'Replay: Mobile Screen' },
  { value: 'Replay_Tablet', label: 'Replay: Tablet Screen' },
  { value: 'Replay_Monitor', label: 'Replay: Monitor or Desktop' },
  { value: 'Replay_TV', label: 'Replay: TV Screen' },
  { value: 'Mask_Paper', label: 'Mask: Paper Cutout' },
  { value: 'Mask_Silicone', label: '3D Mask: Silicone' },
  { value: 'Mask_Latex', label: '3D Mask: Latex' },
  { value: 'Mask_Transparent', label: '3D Mask: Transparent' },
  { value: 'Mask_Plastic', label: '3D Mask: Plastic' },
  { value: 'Mask_Cloth', label: '3D Mask: Cloth' },
  { value: 'Mask_Resin', label: '3D Mask: Resin' },
  { value: 'Mannequin', label: 'Mannequin' },
  { value: 'Wax_Figure', label: 'Wax Figure' },
  { value: 'Other', label: 'Other' },
];

export const LOCATION_OPTIONS: SelectOption[] = [
  { label: 'Indoor', value: 'Indoor' },
  { label: 'Outdoor', value: 'Outdoor' },
  { label: 'In Vehicle', value: 'InVehicle' },
];

export const WEATHER_OPTIONS: SelectOption[] = [
  { label: 'Sunny', value: 'Sunny' },
  { label: 'Rainy', value: 'Rainy' },
  { label: 'Cloudy', value: 'Cloudy' },
  {
    label: 'Early Evening/Minimal Natural Sunlight',
    value: 'Minimal_Natural_Light',
  },
  { label: 'Night/No Natural Sunlight', value: 'No_Natural_Light' },
];

export const LIGHT_SOURCE_OPTIONS: SelectOption[] = [
  { value: 'Sunlight', label: 'Sunlight' },
  { value: 'Lamp', label: 'Lamp' },
  { value: 'CeilingLights', label: 'Ceiling Lights' },
  { value: 'StreetLights', label: 'Street Lights' },
  { value: 'DeviceLight', label: 'Only Device Lights' },
  { value: 'Vehicle_Light', label: 'Vehicle interior lights' },
  { value: 'Natural_light', label: 'Natural light' },
  { value: 'Other', label: 'Other Lights' },
];

export const LIGHT_SOURCE_COLOR_OPTIONS: SelectOption[] = [
  { value: 'Bright White', label: 'Bright White' },
  { value: 'Yellow', label: 'Yellow' },
  { value: 'Black', label: 'Black (No light)' },
  { value: 'Other', label: 'Other' },
];

export const LIGHT_SOURCE_DIRECTION_OPTIONS: SelectOption[] = [
  { value: 'Front', label: 'Front' },
  { value: 'FrontLeft', label: 'Front Left' },
  { value: 'FrontRight', label: 'Front Right' },
  { value: 'Upper', label: 'Upper' },
  { value: 'UpperLeft', label: 'Upper Left' },
  { value: 'UpperRight', label: 'Upper Right' },
  { value: 'Back', label: 'Back' },
  { value: 'BackLeft', label: 'Back Left' },
  { value: 'BackRight', label: 'Back Right' },
  { value: 'Other', label: 'Other' },
];

export const ANCESTRY_OPTIONS: SelectOption[] = [
  { value: 'African_Ancestry', label: 'African Ancestry' },
  { value: 'Americas_Native_Ancestry', label: 'Americas Native Ancestry' },
  { value: 'East_Asian_Ancestry', label: 'East Asian Ancestry' },
  { value: 'European_Ancestry', label: 'European Ancestry' },
  { value: 'Middle_Eastern_Ancestry', label: 'Middle Eastern Ancestry' },
  { value: 'Oceania_Ancestry', label: 'Oceania Ancestry' },
  { value: 'South_Asian_Ancestry', label: 'South Asian Ancestry' },
  { value: 'Other_Ancestry', label: 'Other Ancestry' },
];

export const ETHNICITY_OPTIONS: SelectOption[] = [
  { value: 'Hispanic_Or_Latino', label: 'Hispanic or Latino' },
  { value: 'Not_Hispanic_Or_Latino', label: 'Not Hispanic or Latino' },
];

export const GENDER_OPTIONS: SelectOption[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

export const FACIAL_FEATURE_OPTIONS: SelectOption[] = [
  { value: 'EyeGlass', label: 'Eyeglasses' },
  { value: 'SunGlass', label: 'Sunglasses' },
  { value: 'Mask', label: 'Facial Mask (Covid mask)' },
  { value: 'Hat', label: 'Hat/Cap' },
  { value: 'Hijab', label: 'Hijab' },
  { value: 'Hair', label: 'Head hair covering face' },
  { value: 'Wig', label: 'Wig' },
  { value: 'Beard', label: 'Beard' },
  { value: 'Mustache', label: 'Mustache' },
  { value: 'Bald', label: 'Bald' },
  { value: 'Facial_Jewelry', label: 'Facial jewelry' },
  {
    value: 'Covid_Mask_Below_Mouth',
    label: 'Covid mask below mouth/not on face',
  },
  { value: 'Other', label: 'Other' },
  { value: 'None', label: 'None' },
];

export const MAKEUP_OPTIONS: SelectOption[] = [
  { value: 'No_Makeup', label: 'No Makeup' },
  { value: 'Light_Makeup', label: 'Light Makeup' },
  { value: 'Heavy_Makeup', label: 'Heavy Makeup' },
];
