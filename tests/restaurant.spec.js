const createMenu = require('../src/restaurant');

const menuToTest = createMenu({
  food: {coxinha: 3.90, sanduiche: 9.90},
  drinks: {agua: 3.90, cerveja: 6.90}
});
 
describe('10 - Implemente a função `createMenu`, bem como seus casos de teste', () => {
  it('verifica se a função createMenu() retorna um objeto que possui a chave fetchMenu', () => {
    expect('fetchMenu' in createMenu()).toEqual(true);
  });
  it('verifica se o valor da chave fetchMenu do objeto retornado pela função createMenu() é uma função', () => {
    expect(typeof createMenu().fetchMenu).toEqual('function');
  });
  it('verifica se o objeto retornado pela função createMenu({ food: {}, drinks: {} }).fetchMenu() retorna um objeto cujas chaves são somente food e drinks', () => {
    const keys = Object.keys(createMenu({food: {}, drinks: {}}).fetchMenu());
    expect(keys.length === 2 && keys.includes('food') && keys.includes('drinks')).toEqual(true);
  });
  it('verifica se o menu passado pra função createMenu() é idêntico ao menu recuperado pela função createMenu({ food: {}, drinks: {} }).fetchMenu()', () => {
    expect({food: {}, drinks: {}}).toEqual(createMenu({food: {}, drinks: {}}).fetchMenu());
  });
  it('verifica se a propriedade consumption do objeto retornado pela função createMenu({ food: {}, drinks: {} }), após a criação do menu, retorna um array vazio', () => {
    expect(createMenu().consumption).toEqual([]);
  });
  it('verifica order()', () => {
    let parameter = 'ovo'; // se o parâmetro passado NÃO CONSTAR no objeto (menuToTest), o retorno deve ser 'Item indisponível' e não alterar o array (consumption)
    expect(menuToTest.order(parameter)).toEqual('Item indisponível');
    parameter = 'coxinha'; // se o parâmetro passado CONSTAR no objeto (menuToTest), o parâmetro deve ser adicionado ao array (consumption), aumentando seu 'length'
    const totalConsumption = menuToTest.consumption.length;
    menuToTest.order(parameter);
    expect(menuToTest.consumption.length).toEqual(totalConsumption + 1);
    expect(menuToTest.consumption.includes('coxinha')).toEqual(true);
  });
  it('verifica se, ao adicionar três pedidos em sequência, dentre bebidas e comidas, o array consumption contém os itens pedidos', () => {
    let parameter = 'coxinha';
    menuToTest.order(parameter);
    parameter = 'agua';
    menuToTest.order(parameter);
    parameter = 'sanduiche';
    menuToTest.order(parameter);
    expect(menuToTest.consumption[menuToTest.consumption.length - 1]).toEqual('sanduiche');
    expect(menuToTest.consumption[menuToTest.consumption.length - 2]).toEqual('agua');
    expect(menuToTest.consumption[menuToTest.consumption.length - 3]).toEqual('coxinha');
  });
  it('verifica se a função order aceita que pedidos repetidos sejam acrescidos a consumption', () => {
    let parameter = 'coxinha';
    menuToTest.order(parameter);
    menuToTest.order(parameter); // pediu novamente o mesmo parameter
    menuToTest.order(parameter); // pediu novamente o mesmo parameter
    expect(menuToTest.consumption[menuToTest.consumption.length - 1]).toEqual('coxinha');
    expect(menuToTest.consumption[menuToTest.consumption.length - 2]).toEqual('coxinha');
    expect(menuToTest.consumption[menuToTest.consumption.length - 3]).toEqual('coxinha');
  });
  it('verifica que, ao chamar a função pay() que será uma propriedade do objeto retornado pela função createMenu, deve retornar a soma dos preços de tudo que foi pedido, conforme registrado em consumption. A propriedade pay tem como valor uma função', () => {
    let parameter = 'coxinha';
    menuToTest.order(parameter);
    parameter = 'coxinha';
    menuToTest.order(parameter);
    parameter = 'sanduiche';
    menuToTest.order(parameter);
    parameter = 'agua';
    menuToTest.order(parameter);
    parameter = 'cerveja';
    menuToTest.order(parameter);
    const consumptionToPay = menuToTest.consumption;
    const foodsToPay = Object.entries(menuToTest.fetchMenu().food);
    const drinksToPay = Object.entries(menuToTest.fetchMenu().drinks);
    let totalBill = 0;
    for (item of consumptionToPay) {
      for (const [key, value] of foodsToPay) {
        if (key === item) {
          totalBill += value;
        }
      }
      for (const [key, value] of drinksToPay) {
        if (key === item) {
          totalBill += value;
        }
      }
    }
    totalBill *= 1.1;
    expect(totalBill).toEqual(menuToTest.pay());
  });
});
