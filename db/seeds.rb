# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

fantasy_words = ["Argument", "Journey", "An Object Breaks", "Someone is Hurt", "People Meet", "Time Passes", "A Fight", "Two People Fall in Love", "A Chase", "A Rescue", "People Part Company", "A Trap", "Transformation", "Treasure", "Spell", "Food", "Ring", "Crown", "Window", "Book", "Sword", "Boat", "Door", "Axe", "Fire", "Village", "Prison", "Forest", "Ruin", "River", "Night", "Cave", "Tower", "Mountain", "Kingdom", "Island", "Sea", "Palace", "Cottage", "Town", "Road", "Wise", "Frightened", "Disguised", "Tiny", "Poisoned", "Strong", "Far Away", "Cursed", "Ugly", "Fly", "Happy", "Lucky", "Long-lost", "Stolen", "Hidden", "Beautiful", "Lost", "Sleeping", "Secret", "Old Man", "Bird", "Fairy", "Princess", "Witch", "Thief", "Stepmother", "Giant", "Old Woman", "Wolf", "Child", "Parent", "King", "Cook", "Queen", "Prince", "Beggar", "Shepherdess", "Enemy", "Brother/Sister", "Escape", "A Death", "Dagger", "Good Witch", "Evil", "Magic", "Dwarf", "Gnome", "Elf", "Unicorn", "Wizard", "Sorcerer ", "Sorceress", "Mermaid", "Merman", "Dragon", "Pegasus", "Castle", "Moat", "Arrow", "Meadow", "Crystal", "Hunchback", "Magic Well", "Gypsy", "Tavern", "Pirate", "Magic Hourglass ", "Brawl", "Hunt", "Crossbow ", "True Love", "Ever After", "Once Upon a Time", "Phoenix ", "Harpy", "Wise Woman", "Hag", "Haggard Old Man", "Knight", "Lady", "Count", "Countess", "Baron", "Baroness ", "Barony", "An-Tir", "Squire", "Clouds", "Trapdoor", "Tiara", "Diadem ", "Rose", "Thorn", "Wounded", "Boar", "Cow", "Horse", "Pony", "Wyvern", "Spire", "Garden", "Silver", "Gold", "Donkey", "Cat", "Cart", "Fair", "Talking Beast", "Mother", "Father", "Step Father", "Babe", "Toad", "Task", "Save", "Redeem", "Chivalry", "beard", "Centaur", "Dungeon"]

scifi_words = ["admiral", "AI", "alien", "ally", "android", "anomoly", "apocalyptic", "asteroid", "atomic", "avert", "bacteria", "base", "beam", "biosphere", "biome", "black hole", "blaster", "cadet", "captain", "clone", "colony", "comet", "commander", "corporate", "cosmos", "crater", "credit", "cryostasis", "cyberspace", "cyborg", "dark matter", "decker", "destiny", "disruptor", "Dyson sphere", "dystopia", "earthling", "eclipse", "elite", "empath", "energy", "esper", "examine", "explosion", "extraterrestrial", "flying saucer", "force field", "fourth dimension", "FTL", "fugitive", "galaxy", "genetic engineering", "gravity", "hazardous", "homeworld", "humanoid", "hyperspace", "hyperdrive", "immortal", "implosion", "incredible", "impenetrable", "indestructable", "invade", "laser", "life support", "light speed", "luminous", "mad scientist", "Martian", "meteor", "moon", "mortal", "mothership", "mulitverse", "mutant", "mutate", "navigator", "nano", "ominous", "orbit", "overlord", "oxygen", "phaser", "planet", "planetary", "plasma", "radiation", "ray gun", "rebels", "regenerate", "robot", "satellite", "sensors", "sentient", "shields", "shuttle", "skimmer", "space", "space station", "spaceship", "spacesuit", "star", "starship", "stellar", "tachyons", "tech", "telepath", "teleport", "terraform", "time travel", "tractor beam", "tranquil", "universe", "virus", "warp", 'probe']

western_words = ['Ambush', 'Arrow', 'Bandana', 'Barrel', 'Blacksmith', 'Blood', 'Bloodthirsty', 'Bold', 'Boot Hill', 'Boot', 'Boutny', 'Bow', 'Brave', 'Britches', 'Bronco', 'Bunkhouse', 'Buzzards', 'Campfire', 'Cattle', 'Chaps', 'Corral', 'Country', 'County', 'Courage', 'Cowboy', 'Cowgirl', 'Cowpoke', 'Deputy', 'Desert', 'Draw', 'Drifter', 'Drought', 'Drygulch', 'Dust', 'Fire', 'Fort', 'Frontier', 'Gallop', 'Gang', 'Glance', 'Gold', 'Grin', 'Gunfight', 'Gunfire', 'Hat', 'Herd', 'Hideout', 'Hogtie', 'Holster', 'Horse', 'Horseshoe', 'Howdy', 'Infamous', 'Jail', 'Jerky', 'Justice', 'Lasso', 'Lawman', 'Leather', Lynch 'Mob', 'Match', 'Matches', 'Mob', Native 'American', 'Nefarious', 'Notice', 'Outlaw', 'Pistol', 'Pony', 'Posse', 'Poster', 'Prairie', 'Railroad', 'Ranch', 'Rancher', 'Range', 'Ranger', 'River', 'Rodeo', 'Rope', 'Saddle', 'Saddlebag', 'Saloon', 'Sheriff', 'Smoke', 'Snarl', 'Spurs', 'Stagecoach', 'Tombstone', 'Trail', 'Train', 'Uncharted', 'Undertaker', 'Varmint', 'Vendetta', 'Victim', 'Wagon', 'Wanted', 'Whiskey', 'Wild', 'Wrangler']

horror_words = ['abomination', 'Agony', 'Ash', 'Banished', 'Barren', 'Black', 'Blade', 'Blood', 'Bones', 'Burning', 'Caged', 'Calamity', 'Careless', 'Cast out', 'Chill', 'Clammer', 'Clammy', 'Clawed', 'Cloven', 'Coven', 'Clutch', 'Cold', 'Condem', 'Contempt', 'Convulse', 'Crackle', 'Crazed', 'Creak', 'Creepy', 'Crevice', 'Crow', 'Cruel', 'Crumbling', 'Curl', 'Cursed', 'Curve', 'Cut', 'Dagger', 'Damned', 'Damp', 'Dark', 'Deadly', 'Death', 'Decay', 'Decieve', 'Demonic', 'Depress', 'Despair', 'Despondent', 'Dilapidate', 'Dire', 'Discarded', 'Doom', 'Dread', 'Drip', 'Drool', 'Dust', 'Eerie', 'Empty', 'Endless', 'Eternal', 'Evil', 'Eyeball', 'Fall', 'Fatal', 'Fate', 'Fear', 'Fester', 'Fire', 'Flesh', 'Forgotten', 'Frenzy', 'Fright', 'Gaping', 'Ghoulish', 'Gloomy', 'Gnarled', 'Gnaw', 'Gore', 'Grasp', 'Grey', 'Grin', 'Gut', 'Hang', 'Haunt', 'Heart', 'Hell', 'Hideous', 'Hobble', 'Hole', 'Hopeless', 'Horned', 'Horror', 'Hostile', 'Howl', 'Ice', 'Insane', 'Latch', 'Malevolent', 'Malicious', 'Malignant', 'Mange', 'Maniacal', 'Midnight', 'Monster', 'Mould', 'Neglect', 'Oppress', 'Poison', 'Quiver', 'Raked', 'Raven', 'Reckless', 'Red', 'Ridged', 'Ripped', 'Rodent', 'Rot', 'Scaled', 'Scare', 'Scrape', 'Scrathc', 'Scream', 'Screech', 'Shadows', 'Shake', 'Sharp', 'Shiver', 'Shriek', 'Sin', 'Skeletal', 'Slash', 'Slimey', 'SLither', 'Snap', 'Snare', 'Snarl', 'Soil', 'Soulless', 'Spectre', 'Spine', 'Spooky', 'Squirm', 'Suffer', 'Sullen', 'Sweat', 'Terror', 'Throat', 'Tight', 'Torn', 'Treachery', 'Tremble', 'Turn', 'Twist', 'Unholy', 'Unrelenting', 'Unspeakable', 'Venom', 'Web', 'Wicked', 'Writhe']

steampunk_words = %w()

fantasy = Genre.create!(genre_type: 'Fantasy', genre_tab_url: 'url(http://res.cloudinary.com/arkean/image/upload/c_crop,g_south,x_0,y_0/v1477366373/796c007d80f0ba48a2fbf37d96c046a1_nz9wk7.jpg)', genre_background_url: 'url(http://res.cloudinary.com/arkean/image/upload/v1478114568/413367_art_rycar_zamok_krepost_derevo_shhit_mech_kamni_mo_1680x1050__www.GdeFon.ru_y2tfmg.jpg)')

scifi = Genre.create!(genre_type: "SciFi", genre_tab_url: 'url(http://res.cloudinary.com/arkean/image/upload/v1477368963/copy-banner-1200-x-500_rrfoea.jpg)', genre_background_url: 'url(http://res.cloudinary.com/arkean/image/upload/v1476824784/starscape_2_by_abluescarab-d32goh7_okkysu.png)')

western = Genre.create!(genre_type: "Western", genre_tab_url: "url(http://res.cloudinary.com/arkean/image/upload/c_crop,h_413,x_0,y_107/v1478123441/Wild_Wild_West_by_aSpeckofDust_kklsvo.png)", genre_background_url: "url(http://res.cloudinary.com/arkean/image/upload/c_crop,h_850,q_65,y_129/v1478123475/7MonumentValley_jyfgmq.jpg)")

horror = Genre.create!(genre_type: "Horror", genre_tab_url: "url(http://res.cloudinary.com/arkean/image/upload/c_crop,g_center,h_359,x_47,y_69/v1478123603/3d_dark_night_wallpaper-8_i8lq1u.jpg)", genre_background_url: "url(http://res.cloudinary.com/arkean/image/upload/v1478123645/misty_tree__dark__by_scabeater-d5o778x_p6vt9i.jpg)")

steampunk = Genre.create!(genre_type: "Steampunk", genre_tab_url: "url(http://res.cloudinary.com/arkean/image/upload/v1478122875/airship_city_by_min_nguen-d6lnzda_laol2p.jpg)", genre_background_url: "url(http://res.cloudinary.com/arkean/image/upload/v1478122717/steampunk-image_gmnpm9.jpg)")

fantasy_words.each do |word|
  word = word.split.each{|w| w[0] = w[0].upcase}.join(' ')
  Word.create!(word: word, genre_id: fantasy.id)
end

scifi_words.each do |word|
  word = word.split.each{|w| w[0] = w[0].upcase}.join(' ')
  Word.create!(word: word, genre_id: scifi.id)
end

jon = User.create!(email: "jonmelnick@hotmail.com", username: "jon", password: "password")

caicai = User.create!(email: "caitlin.e.richards@gmail.com", username: "Cai_Richards", password: "Luna1771")

story = Story.create!(title: "CaiCaiSpoon_Still_LovesLittleSpoon", description: "Once upon a time, there was a somewhat beautiful princess, who fell in love with the most  handsome, sweet and sexy prince ever. He was the best and loved her very very much and they got married and had lots of babies and turned into mermaids and lived in their underwater magical castle happily ever after.", genre_id: 1)

sections = ["Once upon a time there was a somewhat beautiful princess who lived in a castle in the forest, but her heart longed for the sea. One day she was walking in the forest and met a prince.", "The princess had met many princes before; many suitors had come from far off kingdoms to win her hand. Most had been ugly, inside and out, but this prince was different from the rest. He was tall and handsome, with hair as dark as the night sky and skin as fair as the moon, and his eyes were many colored, with the green and brown of the forest, blue of the sky and flecks of the gold sunlight that filtered through the trees."]

sections.each do |body|
  x = Section.create!(body: body, user_id: caicai.id, story_id: story.id, seen: {caicai.id => true})
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
