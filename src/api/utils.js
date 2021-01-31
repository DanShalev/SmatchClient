export function transerProfilesServerDataToMocksFormat(profiles) {
    /* NOTE:
    *  This function is temporary, until we finish designing our data in the server and stop using our hard-coded mocks completely.
    * */
    let new_profiles = [];

    for (let profile of profiles) {
        let new_profile = {
            id: profile.id,
            name: profile.name,
            lastSeen: "last seen 5 minutes ago",
            newMessages: 0,
            newSmatch: false,
            fields: [
                { title: "Age", value: profile.age },
                { title: "Sex", value: profile.sex },
            ],
            pictures: [profile.imageUrl]
        }
        profile.imageUrl2 ? new_profile["pictures"].push(profile.imageUrl2) : null;
        profile.imageUrl3 ? new_profile["pictures"].push(profile.imageUrl3) : null;

        new_profiles.push(new_profile);
    }

    return new_profiles;
}
