import { getUserMetdata } from "../../api/SmatchServerAPI";

export async function reloadUserPictures(loggedUserId, setCurrentUserPictures) {
  let userData = await getUserMetdata(loggedUserId);
  let pictures = [userData.image1, userData.image2, userData.image3]
  setCurrentUserPictures(pictures);
}
