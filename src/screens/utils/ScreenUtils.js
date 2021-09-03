import { resetMatchBadges } from "../../redux/slices/matchesSlice";
import { reduceGroupBadges } from "../../redux/slices/groupsSlice";


export function updateMatchAndGroupBadges(profileId, currentGroupId, matches, dispatch) {
  dispatch(resetMatchBadges({ matchId: profileId, groupId: currentGroupId }));
  dispatch(reduceGroupBadges({
    matchId: profileId,
    groupId: currentGroupId,
    oldMatches: matches
  }));
}