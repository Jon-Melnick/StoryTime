json.auth do
  json.id @user.id
  json.username @user.username
  json.email @user.email
  json.session_token @user.session_token
end

json.friendships do
  json.friends @user.friends
  json.pending @user.pending_relationships
end

json.user do
  json.id @user.id
  json.username @user.username
  json.email @user.email
  json.coauthors @user.stories.length
  json.contributions @user.sections.length
end
