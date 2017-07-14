# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Puzzle.delete_all
Character.delete_all
Score.delete_all

# Create the 3 puzzles and set their attributes.
Puzzle.create([{
    url: 'https://s-media-cache-ak0.pinimg.com/originals/86/b9/b1/86b9b1e83140b935031a7c7b0ebf0170.jpg',
    difficulty: "Easy",
    title: "The Town"
  },
  {
    url: 'https://metrouk2.files.wordpress.com/2015/02/x8jz7pq.jpg',
    difficulty: "Medium",
    title: "FVN and Games in Ancient Rome"
  },
  {
    url: 'http://cdn.collider.com/wp-content/uploads/wheres-waldo-book-page-challenge.jpg',
    difficulty: "Hard",
    title: "The Gobbling Gluttons"
  }])

# Create the puzzle characters thorugh their 1:many association.
Puzzle.first.characters.create(name: "Waldo", x_position: 863, y_position: 700)
Puzzle.first.characters.create(name: "Wilma", x_position: 874, y_position: 571)
Puzzle.first.characters.create(name: "Wizard", x_position: 1287, y_position: 728)

Puzzle.find_by(difficulty: "Medium").characters.create(name: "Waldo", x_position: 552, y_position: 227)
Puzzle.find_by(difficulty: "Medium").characters.create(name: "Wilma", x_position: 952, y_position: 596)
Puzzle.find_by(difficulty: "Medium").characters.create(name: "Wizard", x_position: 604, y_position: 134)

Puzzle.last.characters.create(name: "Waldo", x_position: 753, y_position: 276)
Puzzle.last.characters.create(name: "Wilma", x_position: 517, y_position: 257)
Puzzle.last.characters.create(name: "Wizard", x_position: 1116, y_position: 650)

names = ["John", "Jane", "Ashley", "Logan", "Kelly"]

10.times do |t|
  string_number = rand(5..10).to_s + "." + (rand(00..59)).to_s + "." + rand(0.2..99.0).round(2).round.to_s

  string_array = string_number.split(".")
  number = (string_array[0] + string_array[1] + string_array[2]).to_i

  player_name = names[rand(0..4)] + (rand(1..10000)).to_s

  Puzzle.first.scores.create(number: number, player_name: player_name)
  Puzzle.find_by(difficulty: "Medium").scores.create(number: number, player_name: player_name)
  Puzzle.last.scores.create(number: number, player_name: player_name)
end
