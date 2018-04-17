class CreateOutreaches < ActiveRecord::Migration[5.0]
  def change
    create_table :outreaches do |t|
      t.integer :lead_id
      t.text :description

      t.timestamps
    end
  end
end
