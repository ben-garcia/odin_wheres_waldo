class CreateCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :characters do |t|
      t.string :name
      t.integer :x_position
      t.integer :y_position
      t.integer :puzzle_id

      t.timestamps
    end
  end
end
