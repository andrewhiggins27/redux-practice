cause_list = [
  {
    name: 'Launch Coffee Fund',
    description: 'To purchase coffee to fuel Launchers through the cohort'
  },
  {
    name: "AmyLynn's Animal Rescue",
    description: 'To save the lives of whatever adorable creature AmyLynn has found and decided to nurse back to life.'
  }
]

donation_list = [
  {
    name: 'Brianna',
    comment: 'Save the pups!',
    amount: 20,
    cause_id: 2
  },
  {
    name: "Nick",
    comment: 'This money can only go towards good pourover coffee',
    amount: 10,
    cause_id: 1
  },
  {
    name: 'Nick',
    comment: 'UNICORNS FOREVERRRRR',
    amount: 1000000,
    cause_id: 2
  },
  {
    name: 'Dan',
    comment: "Dunkin' is the ONLY way to go.",
    amount: 35,
    cause_id: 1
  }
]

cause_list.each { |cause| Cause.find_or_create_by(cause) }
donation_list.each { |donation| Donation.find_or_create_by(donation) }
