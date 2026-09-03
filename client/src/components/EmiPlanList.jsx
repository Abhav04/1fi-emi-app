export default function EmiPlanList({ emiPlans = [], selectedPlanId, onSelect }) {
  if (!emiPlans || emiPlans.length === 0) {
    return <p className="text-sm text-gray-500 py-2">No EMI plans available</p>;
  }

  return (
    <div className="space-y-3">
      {emiPlans.map((plan) => {
        const isSelected = plan.id === selectedPlanId;
        const monthlyAmountFormatted = Number(plan.monthlyAmount).toLocaleString('en-IN');
        const cashbackNumber = Number(plan.cashback);
        const cashbackFormatted = cashbackNumber.toLocaleString('en-IN');

        return (
          <div
            key={plan.id}
            onClick={() => onSelect(plan.id)}
            className={`rounded-xl p-4 bg-white cursor-pointer transition ${
              isSelected
                ? 'border-2 border-black shadow-xs'
                : 'border border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900 text-base">
                ₹{monthlyAmountFormatted} x {plan.tenureMonths} months
              </span>
              <span className="text-gray-500 text-sm font-medium">
                {Number(plan.interestRate)}% interest
              </span>
            </div>
            {cashbackNumber > 0 && (
              <div className="mt-2 text-green-600 text-sm font-medium">
                Additional cashback of ₹{cashbackFormatted}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
