// import { Leaf, TreeDeciduous, Recycle, Award } from 'lucide-react';

// const commitments = [
//   {
//     icon: TreeDeciduous,
//     title: 'Madeira Certificada',
//     description: '100% de origem controlada e sustentável',
//   },
//   {
//     icon: Recycle,
//     title: 'Zero Desperdício',
//     description: 'Reaproveitamos 95% dos materiais',
//   },
//   {
//     icon: Leaf,
//     title: 'Baixa Emissão',
//     description: 'Processos eco-eficientes',
//   },
//   {
//     icon: Award,
//     title: 'Certificações',
//     description: 'FSC, ISO 14001 e LEED',
//   },
// ];

// export const SustainabilityBanner = () => {
//   return (
//     <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-primary/10">
//       <div className="container">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div className="relative order-2 lg:order-1">
//             <div className="aspect-[4/3] rounded-2xl overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
//                 alt="Sustentabilidade"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-xl border hidden md:block">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   <Leaf className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-roboto-bold text-primary">95%</p>
//                   <p className="text-sm text-muted-foreground">Materiais Reciclados</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-8 order-1 lg:order-2">
//             <div>
//               <span className="text-primary font-roboto-semibold text-sm uppercase tracking-wider">
//                 Sustentabilidade
//               </span>
//               <h2 className="text-4xl font-roboto-bold mt-2 mb-4">Compromisso com o Futuro</h2>
//               <p className="text-lg text-muted-foreground">
//                 Acreditamos que móveis bonitos não precisam custar o planeta. Cada peça é produzida
//                 com responsabilidade ambiental, utilizando madeiras de reflorestamento e processos
//                 sustentáveis.
//               </p>
//             </div>

//             <div className="grid sm:grid-cols-2 gap-4">
//               {commitments.map((item, index) => (
//                 <div
//                   key={item.title}
//                   className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border animate-fade-in"
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
//                     <item.icon className="h-5 w-5 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-roboto-semibold mb-1">{item.title}</h3>
//                     <p className="text-sm text-muted-foreground">{item.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
