
async function parse(text) {
  // Simple mocked NLP parser
  return {
    checkNumber: "10022",
    amount: "4200.00",
    payee: "FutureTech Inc",
    issueDate: new Date().toISOString().split('T')[0],
    memo: "AI Deployment",
    bank: "Wells Fargo"
  };
}
module.exports = { parse };
