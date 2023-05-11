export class CONTACT {
  _id: string | undefined;
  name: string | undefined;
  UID: string | undefined;
  department: string | undefined;
}

export class GAME {
  home!: {
    id: string | undefined;
    name: string | undefined;
    logo: string | undefined;
  };
  away!: {
    id: string | undefined;
    name: string | undefined;
    logo: string | undefined;
  };
}

