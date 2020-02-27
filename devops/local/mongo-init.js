db.createUser(
    {
        user: "localUserbackendapiUser",
        pwd: "test",
        roles: [
            {
                role: "readWrite",
                db: "db-userauth-local"
            }
        ]
    }
);