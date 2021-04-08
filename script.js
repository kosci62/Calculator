const figures = document.querySelectorAll('.figure')
const operators = document.querySelectorAll('.operator')
const redd = document.querySelector('.redd')
const remove = document.querySelector('.remove')
const equality = document.querySelector('.equality')
const previousResault = document.querySelector('.previous-action')
const currentResault = document.querySelector('.current-action')


var currentAction = ''
var action = undefined
var previousAction = ''

const count = () => {
  let action
  if(!previousAction || !currentAction) {
    return
  }

  const previous = parseFloat(previousAction)
  const current = parseFloat(currentAction)

  if(isNaN(previous) || isNaN(current)) {
    return
  }
// function operators 
  switch (operation) {
      case '+':
      action = previous + current
      break
      case '-':
        action = previous - current
      break
      case '×':
        action = previous * current
      break
      case '÷':
      if(current === 0)
      {
        reddResault()
        return
      }
        action = previous / current
      break
      case '^':
        action = Math.pow(previous, current)
      break
      case '%':
        action = previous / 100 * current
      break
      case '√':
        action = Math.pow(previous, 1 / current)
      break
      case 'log':
        action = Math.log(previous) / Math.log(current)
      break
    default:
      return
  }
  currentAction = action
  operation = undefined
  previousAction = ''

}

const chooseOperation = (operator) => {
  if(currentAction === '') {
    return
  }
  if(previousAction !== '') {
    const previous = previousResault.innerText
    if(currentAction.toString() === '0' &&  previous[previous.length - 1] === '÷') {
      reddResault()
      return
    }
    count()
  }

  operation = operator
  previousAction = currentAction
  currentAction = ''
}

const addFigure = (figure) => {
  if(figure === '•') {
    if(currentAction.includes('.')) {
      return
    }
    figure = '.'
  }

  currentAction = currentAction.toString() + figure.toString()
}

const reddFigure = () => {
  currentAction = currentAction.toString().slice(0, -1)
}

const resultUpdate = () => {
  currentResault.innerText = currentAction

  if(operation != null) {
  previousResault.innerText = previousAction + operation
  } else {
    previousResault.innerText = ''
  }
}

const reddResault = () => {
  currentAction = ''
  operation = undefined
  previousAction = ''
}

figures.forEach((figure) => {
  figure.addEventListener('click', () => {
    addFigure(figure.innerText)
    resultUpdate()
  })
})

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    chooseOperation(operator.innerText)
    resultUpdate()
  })
})

equality.addEventListener('click', () => {
  count()
  resultUpdate()
})

remove.addEventListener('click', () => {
  reddFigures()
  resultUpdate()
})

redd.addEventListener('click', () => {
  reddResault()
  resultUpdate()
})