const cards = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
}
const getHandType = (hand) => {
  const cardCount = {}
  let unique = 5
  for (const card of hand) {
    if (cardCount[card] == undefined) cardCount[card] = 0
    else unique--
    cardCount[card]++
  }
  if (unique == 1) return 6
  if (unique == 2) {
    for (const card of hand) {
      const count = cardCount[card]
      if (count == 4 || count == 1) return 5
    }
    return 4
  }
  if (unique == 3) {
    for (const card of hand) {
      const count = cardCount[card]
      if (count == 3) return 3
    }
    return 2
  }
  if (unique == 4) return 1
  return 0
}
const parseHand = (input) => {
  const hands = []
  for (const line of input) {
    const [handStr, bid] = line.split(" ")
    const hand = handStr.split("")
      .map(card => {
        if (isNaN(Number(card))) return cards[card]
        return parseInt(card)
      })
    const handType = getHandType(hand)
    hands.push({ hand, bid: Number(bid), handType })
  }
  hands.sort((a, b) => {
    if (a.handType === b.handType) {
      for (let i = 0; i < 5; i++) {
        if (a.hand[i] == b.hand[i]) continue
        return a.hand[i] - b.hand[i]
      }
    }
    return a.handType - b.handType
  })
  console.log(hands)
  return hands
}
const solvePartOne = (hands) => {
  let total = 0
  for (let i = 0; i < hands.length; i++) {
    total += hands[i].bid * (i + 1)
  }
  return total
}

const solution = (input) => {
  const hands = parseHand(input)
  const partOne = solvePartOne(hands)
  return { partOne }
}
module.exports = { solution }