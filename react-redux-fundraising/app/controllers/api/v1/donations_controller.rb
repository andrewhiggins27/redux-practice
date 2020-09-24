class Api::V1::DonationsController < ApiController
  def index
    cause = Cause.find(params[:cause_id])
    render json: cause.donations
  end

  def create
    donation = Donation.new(donation_params)
    donation.cause = Cause.find(params[:cause_id])

    if donation.save
      render json: donation, status: :created
    else
      render json: { errors: donation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def donation_params
    params.require(:donation).permit(:name, :comment, :amount)
  end
end
