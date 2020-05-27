class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  protect_from_forgery unless: -> { request.format.json? }

  def show
    render json: User.find(params[:id])
  end

end
