const EventEmitter = require('events');

// Create your own emitter by extending the class (common real pattern)
class OrderEmitter extends EventEmitter {}
const orderEmitter = new OrderEmitter();

// Register listeners — code that runs WHEN a specific event fires
orderEmitter.on('orderPlaced', (orderId) => {
  console.log(`📧 Sending confirmation email for order ${orderId}`);
});

orderEmitter.on('orderPlaced', (orderId) => {
  console.log(`📦 Notifying warehouse for order ${orderId}`);
});
// NOTE: you can attach MULTIPLE listeners to the SAME event —
// WHY: email logic and warehouse logic stay SEPARATE, instead of cramming
// everything into one big "placeOrder()" function

// Trigger ("emit") the event — this runs ALL listeners registered above, in order
orderEmitter.emit('orderPlaced', 'ORD123');

// Output:
// 📧 Sending confirmation email for order ORD123
// 📦 Notifying warehouse for order ORD123