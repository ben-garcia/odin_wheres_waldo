class CharactersController < ApplicationController
  def index
    @characters = Character.all
    respond_to do |format|
      # remove the updated_at, id, and created_at attributes form the results.
      format.json { render json: @characters, except: [:id, :created_at, :updated_at] }
    end
  end
end
