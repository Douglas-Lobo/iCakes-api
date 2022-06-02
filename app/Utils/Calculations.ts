const calcIngredientTotal = (cost: number, usedAmount: number, initialAmount: number) => {
  return { total: (cost * usedAmount) / initialAmount }
}

const calcBudgetValues = (budgetCost: number, ingredientTotal: number, profitPercent: number) => {
  const newCost = budgetCost + ingredientTotal
  const newProfit = newCost * (profitPercent / 100)
  const newTotal = newCost + newProfit
  return { cost: newCost, profit: newProfit, total: newTotal }
}

const updateBudgetValues = (
  profitPercent: number,
  budgetTotal: number,
  budgetCost: number,
  budgetProfit: number
) => {
  const newProfit = budgetCost * (profitPercent / 100)
  const newTotal = newProfit + (budgetTotal - budgetProfit)
  return { profit: newProfit, total: newTotal, profitPercent: profitPercent }
}

const budgetDelIngredient = (budgetCost: number, profitPercent: number) => {
  const newProfit = budgetCost * (profitPercent / 100)
  const newTotal = newProfit + budgetCost
  return { cost: budgetCost, profit: newProfit, total: newTotal }
}

export { calcBudgetValues, calcIngredientTotal, updateBudgetValues, budgetDelIngredient }
