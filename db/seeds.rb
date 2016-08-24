# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

fantasy_words = ["Argument", "Journey", "An Object Breaks", "Someone is Hurt", "People Meet", "Time Passes", "A Fight", "Two People Fall in Love", "A Chase", "A Rescue", "People Part Company", "A Trap", "Transformation", "Treasure", "Spell", "Food", "Ring", "Crown", "Window", "Book", "Sword", "Boat", "Door", "Axe", "Fire", "Village", "Prison", "Forest", "Ruin", "River", "Night", "Cave", "Tower", "Mountain", "Kingdom", "Island", "Sea", "Palace", "Cottage", "Town", "Road", "Wise", "Frightened", "Disguised", "Tiny", "Poisoned", "Strong", "Far Away", "Cursed", "Ugly", "Fly", "Happy", "Lucky", "Long-lost", "Stolen", "Hidden", "Beautiful", "Lost", "Sleeping", "Secret", "Old Man", "Bird", "Fairy", "Princess", "Witch", "Thief", "Stepmother", "Giant", "Old Woman", "Wolf", "Child", "Parent", "King", "Cook", "Queen", "Prince", "Beggar", "Shepherdess", "Enemy", "Brother/Sister", "Escape", "A Death", "Dagger", "Good Witch", "Evil", "Magic", "Dwarf", "Gnome", "Elf", "Unicorn", "Wizard", "Sorcerer ", "Sorceress", "Mermaid", "Merman", "Dragon", "Pegasus", "Castle", "Moat", "Arrow", "Meadow", "Crystal", "Hunchback", "Magic Well", "Gypsy", "Tavern", "Pirate", "Magic Hourglass ", "Brawl", "Hunt", "Crossbow ", "True Love", "Ever After", "Once Upon a Time", "Phoenix ", "Harpy", "Wise Woman", "Hag", "Haggard Old Man", "Knight", "Lady", "Count", "Countess", "Baron", "Baroness ", "Barony", "An-Tir", "Squire", "Clouds", "Trapdoor", "Tiara", "Diadem ", "Rose", "Thorn", "Wounded", "Boar", "Cow", "Horse", "Pony", "Wyvern", "Spire", "Garden", "Silver", "Gold", "Donkey", "Cat", "Cart", "Fair", "Talking Beast", "Mother", "Father", "Step Father", "Babe", "Toad", "Task", "Save", "Redeem", "Chivalry"]

scifi_words = ["admiral", "AI", "alien", "ally", "android", "anomoly", "apocalyptic", "asteroid", "atomic", "avert", "bacteria", "base", "beam", "biosphere", "biome", "black hole", "blaster", "cadet", "captain", "clone", "colony", "comet", "commander", "corporate", "cosmos", "crater", "credit", "cryostasis", "cyberspace", "cyborg", "dark matter", "decker", "destiny", "disruptor", "Dyson sphere", "dystopia", "earthling", "eclipse", "elite", "empath", "energy", "esper", "examine", "explosion", "extraterrestrial", "flying saucer", "force field", "fourth dimension", "FTL", "fugitive", "galaxy", "genetic engineering", "gravity", "hazardous", "homeworld", "humanoid", "hyperspace", "hyperdrive", "immortal", "implosion", "incredible", "impenetrable", "indestructable", "invade", "laser", "life support", "light speed", "luminous", "mad scientist", "Martian", "meteor", "moon", "mortal", "mothership", "mulitverse", "mutant", "mutate", "navigator", "nano", "ominous", "orbit", "overlord", "oxygen", "phaser", "planet", "planetary", "plasma", "radiation", "ray gun", "rebels", "regenerate", "robot", "satellite", "sensors", "sentient", "shields", "shuttle", "skimmer", "space", "space station", "spaceship", "spacesuit", "star", "starship", "stellar", "tachyons", "tech", "telepath", "teleport", "terraform", "time travel", "tractor beam", "tranquil", "universe", "virus", "warp"]

fantasy = Genre.create!(genre_type: 'Fantasy')
scifi = Genre.create!(genre_type: "SciFi")

fantasy_words.each do |word|
  Word.create!(word: word, genre_id: fantasy.id)
end

scifi_words.each do |word|
  Word.create!(word: word, genre_id: scifi.id)
end

jon = User.create!(email: "jonmelnick@hotmail.com", username: "jon", password: "password")

caicai = User.create!(email: "caitlin.e.richards@gmail.com", username: "Cai_Richards", password: "Luna1771")

story = Story.create!(title: "CaiCaiSpoon_Still_LovesLittleSpoon", description: "Once upon a time, there was a somewhat beautiful princess, who fell in love with the most  handsome, sweet and sexy prince ever. He was the best and loved her very very much and they got married and had lots of babies and turned into mermaids and lived in their underwater magical castle happily ever after.", genre_id: 1)

sections = ["Once upon a time there was a somewhat beautiful princess who lived in a castle in the forest, but her heart longed for the sea. One day she was walking in the forest and met a prince.", "The princess had met many princes before; many suitors had come from far off kingdoms to win her hand. Most had been ugly, inside and out, but this prince was different from the rest. He was tall and handsome, with hair as dark as the night sky and skin as fair as the moon, and his eyes were many colored, with the green and brown of the forest, blue of the sky and flecks of the gold sunlight that filtered through the trees."]

sections.each do |body|
  Section.create!(body: body, user_id: caicai.id, story_id: story.id)
end

Friendship.create!(requester_id: jon.id, receiver_id: caicai.id, status: 'friends')
Friendship.create!(requester_id: caicai.id, receiver_id: jon.id, status: 'friends')

Writer.create!(story_id: story.id, user_id: caicai.id, hand: story.generate_hand)
Writer.create!(story_id: story.id, user_id: jon.id, hand: story.generate_hand)

User.create!(username: 'kevin', email: 'kevin@fake.com', password: 'password')
User.create!(username: 'james', email: 'james@fake.com', password: 'password')
User.create!(username: 'merryl', email: 'merryl@fake.com', password: 'password')
User.create!(username: 'Sam', email: 'Samfake.com', password: 'password')
User.create!(username: 'Cole', email: 'Cole@fake.com', password: 'password')
User.create!(username: 'smithy', email: 'smithy@fake.com', password: 'password')
User.create!(username: 'carol', email: 'carol@fake.com', password: 'password')
User.create!(username: 'Ben', email: 'Ben@fake.com', password: 'password')
User.create!(username: 'Aaron', email: 'Aaron@fake.com', password: 'password')
User.create!(username: 'SlyDog', email: 'SlyDog@fake.com', password: 'password')
User.create!(username: 'StoryKing', email: 'StoryKing@fake.com', password: 'password')

20.times do
  User.create!(username: Faker::Superhero.name, email: Faker::Internet.email, password: 'password')
end
