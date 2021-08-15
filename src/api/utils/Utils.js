import {saveToFileSystem} from "../../components/cache/CacheUtil";

export async function cacheGroupsImages(groups) {
  let updatedGroups = groups
  for (const [i, group] of groups.entries()) {
    if (group.avatar !== null) {
      updatedGroups[i].avatar = await saveToFileSystem(group.avatar)
    }
  }
  return [
    ...updatedGroups
  ]
}

export async function cacheProfilesImages(profiles) {
  let currentProfiles = {};
  for (const [groupId, profilesList] of Object.entries(profiles)) {
    let currentProfileList = profilesList
    for (const [i, profile] of Object.entries(profilesList)) {

      if (profile.image1 !== null) {
        currentProfileList[i].image1 = await saveToFileSystem(profile.image1)
      }
      if (profile.image2 !== null) {
        currentProfileList[i].image2 = await saveToFileSystem(profile.image2)
      }
      if (profile.image3 !== null) {
        currentProfileList[i].image3 = await saveToFileSystem(profile.image3)
      }
      currentProfiles[groupId] = currentProfileList;
    }
  }
  return {
    ...currentProfiles
  }
}

export async function cacheUserImages(data) {
  let updatedData = data;

  if (data.image1 !== null) {
    updatedData.image1 = await saveToFileSystem(data.image1)
  }
  if (data.image2 !== null) {
    updatedData.image2 = await saveToFileSystem(data.image2)
  }
  if (data.image3 !== null) {
    updatedData.image3 = await saveToFileSystem(data.image3)
  }
  return {
    ...updatedData
  }
}
