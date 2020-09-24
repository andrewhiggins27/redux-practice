class Api::V1::CausesController < ApiController
  def index
    render json: Cause.all
  end
end
