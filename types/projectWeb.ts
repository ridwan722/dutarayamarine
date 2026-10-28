export type ProjectWebTimestamp =
  | number
  | string
  | Date
  | {
      seconds?: number;
      _seconds?: number;
      toMillis?: () => number;
    };

export type ProjectWebPhoto =
  | string
  | {
      url?: string;
    };

export interface ProjectWebRecord {
  id_project_web?: string;
  createdAt?: ProjectWebTimestamp;
  foto?: ProjectWebPhoto[];
  judul?: string;
  sub_judul?: string;
  paragraf?: string[] | string;
  paragraf_penutup?: string;
}

export type ProjectWeb = ProjectWebRecord & {
  readonly id: string;
};
