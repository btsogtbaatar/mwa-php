export class Character {
  name: string;
  pictureUrl: string;
  actorName: string;
  actorPictureUrl: string;

  constructor(
    name: string,
    pictureUrl: string,
    actorName: string,
    actorPictureUrl: string
  ) {
    this.name = name;
    this.pictureUrl = pictureUrl;
    this.actorName = actorName;
    this.actorPictureUrl = actorPictureUrl;
  }
}

export class Movie {
  _id: string;
  name: string;
  releasedYear: number;
  genre: string[];
  characters: Character[];

  constructor(
    _id: string,
    name: string,
    releasedYear: number,
    genre: string[],
    characters: Character[]
  ) {
    this._id = _id;
    this.name = name;
    this.releasedYear = releasedYear;
    this.genre = genre;
    this.characters = characters;
  }
}
