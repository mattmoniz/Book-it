class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery unless: -> { request.format.json? }

  def show
    render json: User.find(params[:id])
  end

end
