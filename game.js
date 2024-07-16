const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'An order has been entered into IMI. Has the total allocation quantity been reached?',
    options: [
      {
        text: 'Yes',
        nextText: 8
      },
      {
        text: 'No',
        nextText: 2
      },
      {
        text: 'I don\'t know what that means.',
        nextText: 13
      }
    ]
  },
  {
    id: 2,
    text: 'Is inventory available?',
    options: [
      {
        text: 'Yes',
        nextText: 3
      },
      {
        text: 'No',
        nextText: 4
      }
    ]
  },
  {
    id: 3,
    text: 'The Order Manager releases the order in HN0220 (changed from 630 Status to 650 Status) --> the order drops to the Warehouse, and then Inventory is Picked/Order is Shipped!',
    options: [
      {
        text: 'You did it! Horray! Play again?',
        nextText: -1
      }
    ]
  },
  {
    id: 4,
    text: 'Order Manager will reference the Inventory Template AND ProdBase to decide between the following:',
    options: [
        {
          text: 'Cut the Order',
          nextText: 3
        },
        {
          text: 'Reach out to ATP for help in getting the Line to a Good Status',
          nextText: 5
        },
        {
          text: 'Push Order Out',
          nextText: 6,
        }
      ]
  },
  {
    id: 5,
    text: 'Order Manager has reached out to ATP for help. ATP can either:',
    options: [
      {
        text: 'Rerun the allocation',
        nextText: 3
      },
      {
        text: 'Create a manual PO and  then rerun the allocation',
        nextText: 3
      }
    ]
  },
  {
    id: 6,
    text: 'It\'s in the best interest for the Customer to push this order out.',
    options: [
      {
        text: 'Order Manager Shifts the Ship-Date to a later date based on availability',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Hooray! The Customer will get their Order at a later day.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 8,
    text: 'Is this a Soft Allocation?',
    options: [
      {
        text: 'Yes',
        nextText: 9
      },
      {
        text: 'No',
        nextText: 10
      },
      {
        text: 'I don\'t know what that means',
        nextText: 11
      }
    ]
  },
  {
    id: 9,
    text: 'Sweet. That means that new orders will be placed on a 963 Hold automatically by IMI. Orders on Hold are sent to the Supply Planning Team DAILY for review. They review it and get back to you: what did they say?',
    options: [
      {
        text: 'To Cut',
        nextText: 12
      },
      {
        text: 'Or Not To Cut',
        nextText: 2
      }
    ]
  },
  {
    id: 10,
    text: 'IMI will AUTOMATICALLY cut all newly entered orders for the Customer.',
    options: [
      {
        text: 'What happens next?',
        nextText: 3
      }
    ]
  },
  {
    id: 11,
    text: 'There are 4 Different types of allocations: Soft, Hard, Autocut Percentage, and Autocut Threshold. Soft will not cut anything on orders, it will simply flag it. Hard allocations are cut automatically because these items cannot go over (i.e. new itmes). Autocut Percentage and Autocut Threshold are less common, but are used at the discretion of the Demand Planning Team',
    options: [
      {
        text: 'Now that you know, let\'ts go back.',
        nextText: 8
      }
    ]
  },
  {
    id: 12,
    text: 'The order is cut in IMI with the 021 Reason Code. The Order Manager releases the order in HN0220 (changed from 630 Status to 650 Status) --> the order drops to the Warehouse, and then Inventory is Picked / Order is Shipped!',
    options: [
      {
        text: 'Congrats! The order went out and our Inventory is safe. Play Again?',
        nextText: -1
      }
    ]
  },
  {
    id: 13,
        text: 'There is a limited amount of supply within our network. Marketing makes the decision to strategically allot product to certain Customers. The ATP team is responsible for executing that strategy. Therefore, if an Order is over its "Allocation Quantity", that means that they have ordered MORE than what they have been allotted. Thus, action needs to be taken',
    options: [
      {
        text: 'Great! Now that you know a little bit more about allocation, let\'s go back.',
        nextText: 1
      }
    ]
  }
]

startGame()