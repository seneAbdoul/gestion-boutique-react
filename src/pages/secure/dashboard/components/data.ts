export interface CardModel{
    stat: string,
    text: string,
    description?: string,
    icon?: string,
    pourcents?: string
}
const datasCard: CardModel[] = [
    {
      stat: '90',
      text: 'Ventes',
      description: 'Les ventes ont augmenté de 15% en cette période',
      icon: 'fas fa-chart-line', 
      pourcents: '15%',
    },
    {
      stat: '80',
      text: 'Produits',
      description: 'Les produits ont augmenté de 10% en cette période',
      icon: 'fas fa-shopping-bag', 
      pourcents: '10%',
    },
    {
      stat: '70',
      text: 'Clients',
      description: 'Les clients ont augmenté de 5% en cette période',
      icon: 'fas fa-users',
      pourcents: '5%',
    },
    {
      stat: '60',
      text: 'Commandes',
      description: 'Les commandes ont augmenté de 2% en cette période',
      icon: 'fas fa-shopping-cart',
      pourcents: '2%',
    },
];
  
export default datasCard