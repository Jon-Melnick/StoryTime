json.array! @genres do |genre|
  json.id genre.id
  json.genre genre.genre_type
  json.total_words genre.total_words
  json.tab_img genre.genre_tab_url
end
