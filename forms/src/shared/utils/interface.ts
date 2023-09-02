export interface LoginForm {
  username: string;
  password: string;
}

export interface Options {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export interface SectionData {
  name: string;
  type: string;
  options: Options;
}
export interface DescriptionData {
  name: string;
  type: string;
  options: Options;
}

export interface FieldsData {
  type: string;
  data: any[];
  index: number;
}

export interface Section {
  section: SectionData;
  description: DescriptionData;
  index: number;
  fields: FieldsData[];
}

export interface FormData {
  sections: Section[];
  name: string;
  _id: string;
}
