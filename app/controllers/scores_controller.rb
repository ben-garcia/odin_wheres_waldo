class ScoresController < ApplicationController
  def index
    @scores = Score.all
  end

  def create
    @score = Score.new(score_params)
    @score.save
  end

  private

  def score_params
    params.permit(:number, :player_name, :puzzle_id)
  end
end
