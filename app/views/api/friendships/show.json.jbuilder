json.friend do
  json.id @friend.id
  json.username @friend.username
  json.email @friend.email
  json.coauthors @friend.stories.length
  json.contributions @friend.sections.length
  json.storyIds @friend.storyIds
end

json.friendship @friendship.friend_info
