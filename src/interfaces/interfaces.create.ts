export interface WearerData {
  group_id: string;
  first_name: string;
  surname: string;
  ref: string;
  email: string;
  notes: string;
  start_tagging_time: string;
  end_tagging_time: string;
  device_profile_id: string;
  device_profile_sb_id: string;
  device_profile_name: string;
  timezone_id: string;
  wearer_type_id: string;
  address_name: string;
  line_1: string;
  line_2: string;
  line_3: string;
  city: string;
  county: string;
  postcode: string;
  address_type_id: string;
  telephone: string;
  interpretor_required: string;
  size_id: string;
  responsible_officer_id: string;
  country_id: string;
  risk_level_id: string;
  lat: string;
  lon: string;
}

export interface CreateWearerRequest {
  wearer: WearerData;
  request_type: string;
  return_type: string;
  method: string;
  c: string;
  csrf_token: string;
}
