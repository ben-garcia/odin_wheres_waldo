class CreatePuzzles < ActiveRecord::Migration[5.1]
  def change
    create_table :puzzles do |t|
      t.string :url
      t.string :title
      t.string :difficulty

      t.timestamps
    end
  end
end
