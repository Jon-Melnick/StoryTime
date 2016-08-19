# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

fantasy_words = ["An Argument", "Journey", "An Object Breaks", "Someone is Hurt", "People Meet", "Time Passes", "A Fight", "Two People Fall in Love", "A Chase", "A Rescue", "People Part Company", "A Trap", "Transformation", "Treasure", "Spell", "Food", "Ring", "Crown", "Window", "Book", "Sword", "Boat", "Door", "Axe", "Fire", "Village", "Prison", "Forest", "Ruin", "River", "Night", "Cave", "Tower", "Mountain", "Kingdom", "Island", "At Sea", "Palace", "Cottage", "Town", "Road", "Very Wise", "Frightened", "Disguised", "Tiny", "Poisoned", "Very Strong", "Far Away", "Cursed", "Ugly", "This Can Fly", "Happy", "Lucky", "This Animal Can Talk", "Long-lost", "Stolen", "Hidden", "Beautiful", "Lost", "Sleeping", "Secret", "Old Man", "Bird", "Fairy", "Princess", "Witch", "Thief", "Stepmother", "Giant", "Old Woman", "Wolf", "Child", "Parent", "King", "Cook", "Queen", "Prince", "Beggar", "Shepherdess", "Enemy", "Brother/Sister", "Escape", "A Death"]

fantasy = Genre.create!(genre_type: 'Fantasy')

fantasy_words.each do |word|
  Word.create!(word: word, genre_id: fantasy.id)
end

User.create!(email: "jonmelnick@hotmail.com", username: "jon", password: "password")
