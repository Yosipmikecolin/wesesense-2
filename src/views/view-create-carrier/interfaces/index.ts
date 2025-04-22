export interface FormDataCarrier {
  _id: string;
  personalData: Step1Data;
  cause: Step2Data;
  monitoring: Step3Data;
  inclusionArea: Step4Data;
  exclusionArea: Step5Data;
  wearer: Step6Data;
}
export interface FormDataWearer {
  _id: string;
  personalData: Step1Data;
  cause: Step2Data;
  monitoring: Step3Data;
  inclusionArea: Step4Data;
  exclusionArea: Step5Data;
  wearer: Step6Data;
}

export interface FormDataCarrierPost {
  personalData: Step1Data;
  cause: Step2Data;
  monitoring: Step3Data;
  inclusionArea: Step4Data;
  exclusionArea: Step5Data;
}

export interface Step1Data {
  fullName: string;
  socialName: string;
  paternalSurname: string;
  sex: string;
  motherSurname: string;
  type_current: string;
  gender: string;
  dateBirth: string;
  maritalStatus: string;
  nationality: string;
  run: string;
  phone: string;
  foreigner: boolean;
  start_tagging_time: Date;
  end_tagging_time: Date;
  days: number;
}

export interface Step2Data {
  penatype: string;
  crs: string;
  crime: string;
  courtAppeals: string;
  courtRegion: string;
  court: string;
  ruc: string;
  rit: string;
  rol: string;
}

export interface Step3Data {
  areas: string;
  durationMeasurement: string;
  controlSchedule: string;
  effectivePeriod: string;
  requestsFeasibility: string;
  judgment: string;
  programmingInstallation: string;
  installationsDone: string;
  modificationResolution: string;
  technicalSupports: string;
  nonReports: string;
  daysControl: string;
  uninstallations: string;
}

export interface Step4Data {
  street: string;
  number: string;
  additionalInformation: string;
  commune: string;
  region: string;
  road: string;
  population: string;
  zipCode: string;
  geographicCoordinates: string;
  radio: string;
  complianceSchedule: string;
  characteristics: string;
}

export interface Step5Data {
  street: string;
  number: string;
  additionalInformation: string;
  commune: string;
  region: string;
  road: string;
  population: string;
  zipCode: string;
  geographicCoordinates: string;
  radio: string;
  characteristics: string;
  paternalSurname: string;
  motherSurname: string;
  names: string;
  rut: string;
  complianceSchedule: string;
  victimEmail: string;
  homeTelephone: string;
  workplaceTelephone: string;
}

export interface Step6Data {
  id: string;
  first_name: string;
  surname: string;
  email: string;
  line_1: string;
  line_2: string;
  line_3: string;
  city: string;
  county: string;
  telephone: string;
}

export interface StepProps1 {
  formData: Step1Data;
  setFormData: (data: Step1Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface StepProps2 {
  formData: Step2Data;
  setFormData: (data: Step2Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface StepProps3 {
  formData: Step3Data;
  setFormData: (data: Step3Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface StepProps4 {
  formData: Step4Data;
  setFormData: (data: Step4Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface StepProps5 {
  formData: Step5Data;
  setFormData: (data: Step5Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface StepProps6 {
  formData: Step6Data;
  setFormData: (data: Step6Data) => void;
  setCompleteForm: (complete: boolean) => void;
}

export interface TimelineProps {
  steps: string[];
  currentStep: number;
}
