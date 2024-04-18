export interface IEpisodes {
  info:    Info;
  results: IAllResultEpisode[];
}

export interface Info {
  count: number;
  pages: number;
  next:  string;
  prev:  null;
}

export interface IAllResultEpisode {
  id:         number;
  name:       string;
  air_date:   string;
  episode:    string;
  characters: string[];
  url:        string;
  created:    Date;
}
