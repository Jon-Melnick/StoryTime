json.array! @users do |user|
  json.id user.id
  json.email user.email
  json.username user.username
  json.coauthors user.stories.length
  json.contributions user.sections.length
  json.storyIds user.storyIds
end
