# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

fantasy_words = ["Argument", "Journey", "An Object Breaks", "Someone is Hurt", "People Meet", "Time Passes", "A Fight", "Two People Fall in Love", "A Chase", "A Rescue", "People Part Company", "A Trap", "Transformation", "Treasure", "Spell", "Food", "Ring", "Crown", "Window", "Book", "Sword", "Boat", "Door", "Axe", "Fire", "Village", "Prison", "Forest", "Ruin", "River", "Night", "Cave", "Tower", "Mountain", "Kingdom", "Island", "Sea", "Palace", "Cottage", "Town", "Road", "Wise", "Frightened", "Disguised", "Tiny", "Poisoned", "Strong", "Far Away", "Cursed", "Ugly", "Fly", "Happy", "Lucky", "This Animal Can Talk", "Long-lost", "Stolen", "Hidden", "Beautiful", "Lost", "Sleeping", "Secret", "Old Man", "Bird", "Fairy", "Princess", "Witch", "Thief", "Stepmother", "Giant", "Old Woman", "Wolf", "Child", "Parent", "King", "Cook", "Queen", "Prince", "Beggar", "Shepherdess", "Enemy", "Brother/Sister", "Escape", "A Death"]

scifi_words = ["admiral", "AI", "alien", "ally", "android", "anomoly", "apocalyptic", "asteroid", "atomic", "avert", "bacteria", "base", "beam", "biosphere", "biome", "black hole", "blaster", "cadet", "captain", "clone", "colony", "comet", "commander", "corporate", "cosmos", "crater", "credit", "cryostasis", "cyberspace", "cyborg", "dark matter", "decker", "destiny", "disruptor", "Dyson sphere", "dystopia", "earthling", "eclipse", "elite", "empath", "energy", "esper", "examine", "explosion", "extraterrestrial", "flying saucer", "force field", "fourth dimension", "FTL", "fugitive", "galaxy", "genetic engineering", "gravity", "hazardous", "homeworld", "humanoid", "hyperspace", "hyperdrive", "immortal", "implosion", "incredible", "impenetrable", "indestructable", "invade", "laser", "life support", "light speed", "luminous", "mad scientist", "Martian", "meteor", "moon", "mortal", "mothership", "mulitverse", "mutant", "mutate", "navigator", "nano", "ominous", "orbit", "overlord", "oxygen", "phaser", "planet", "planetary", "plasma", "radiation", "ray gun", "rebels", "regenerate", "robot", "satellite", "sensors", "sentient", "shields", "shuttle", "skimmer", "space", "space station", "spaceship", "spacesuit", "star", "starship", "stellar", "tachyons", "tech", "telepath", "teleport", "terraform", "time travel", "tractor beam", "tranquil", "universe", "virus", "warp"]

fantasy = Genre.create!(genre_type: 'Fantasy')
scifi = Genre.create!(genre_type: "SciFi")

fantasy_words.each do |word|
  Word.create!(word: word, genre_id: fantasy.id)
end

scifi_words.each do |word|
  Word.create!(word: word, genre_id: scifi.id)
end

User.create!(email: "jonmelnick@hotmail.com", username: "jon", password: "password")
