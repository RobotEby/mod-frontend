export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  created_at: string;
}

export const mockBlogPosts = [
  {
    id: '1',
    slug: 'moveis-sob-medida-investimento-nao-custo',
    title: 'Por que móveis sob medida são um investimento — e não um custo',
    excerpt:
      'Muitos olham apenas o preço inicial, mas esquecem do valor a longo prazo. Descubra a matemática real por trás da durabilidade e valorização do seu imóvel.',
    content: `Muitas pessoas hesitam na hora de fechar um projeto de móveis sob medida devido ao valor inicial ser superior ao de móveis prontos de grandes varejistas. No entanto, essa é uma visão de curto prazo que ignora fatores cruciais de economia e valorização patrimonial.

## A Matemática da Durabilidade

Um móvel planejado bem executado, utilizando materiais de qualidade e ferragens de alto padrão, tem uma vida útil estimada superior a 15 ou 20 anos. Em contrapartida, móveis modulares de baixa densidade costumam apresentar problemas estruturais em 3 a 5 anos. Ao diluir o custo pelo tempo de uso, o sob medida torna-se, ironicamente, mais barato.

## O Aproveitamento de Espaço é Dinheiro

O metro quadrado dos imóveis está cada vez mais caro. Comprar um móvel pronto que deixa "espaços mortos" entre a parede e o armário é, literalmente, desperdiçar o dinheiro que você pagou pelo imóvel. O projeto sob medida ocupa 100% da área útil, transformando cantos inuteis em armazenamento funcional.

## Valorização Real do Imóvel

Apartamentos e casas com marcenaria fixa de qualidade são vendidos mais rápido e por um valor maior. O mercado imobiliário entende que armários embutidos, painéis e cozinhas planejadas são benfeitorias perenes que poupam tempo e dinheiro do futuro comprador.

## Personalização que Gera Bem-estar

Além do financeiro, existe o retorno em qualidade de vida. Ter uma casa que funciona exatamente para a sua rotina — com a altura correta das bancadas, gavetas organizadas e estética alinhada ao seu gosto — reduz o estresse diário e aumenta o conforto. Isso é um retorno intangível, mas valioso.`,
    category: 'Consumidor Final',
    image_url: 'https://images.pexels.com/photos/313776/pexels-photo-313776.jpeg',
    created_at: '2026-01-05T10:00:00Z',
  },
  {
    id: '2',
    slug: 'erros-comuns-comprar-moveis-planejados',
    title: 'Erros comuns ao comprar móveis planejados (e como evitar)',
    excerpt:
      'Evite dores de cabeça e prejuízos. Listamos as falhas mais frequentes que transformam o sonho da casa nova em pesadelo e mostramos como se proteger.',
    content: `A compra de móveis planejados é um momento emocionante, mas que exige racionalidade. Infelizmente, a falta de conhecimento técnico leva muitos consumidores a cometerem erros que só serão percebidos após a instalação.

## Comprar Apenas Pelo Preço

O erro número um. Orçamentos muito abaixo da média do mercado geralmente escondem materiais de segunda linha (MDF de baixa densidade), ferragens que oxidam rápido ou falta de garantia. O barato sai caro quando as portas começam a emperrar em seis meses.

## Ignorar a Ergonomia e Circulação

Um móvel lindo que atrapalha a passagem ou que exige contorcionismo para ser usado não serve para nada. É fundamental respeitar as distâncias mínimas de circulação (geralmente 60cm a 80cm) e alturas confortáveis para bancadas e armários superiores.

## Não Considerar a Manutenção

Acabamentos brilhantes em áreas de alto tráfego ou cores muito escuras em ambientes pequenos podem se tornar um pesadelo de limpeza. A escolha dos materiais deve considerar quem vai limpar e com qual frequência.

## A Falta de um Contrato Técnico

Nunca feche negócio apenas com um "aperto de mão". Um projeto técnico detalhado, especificando materiais, marcas das corrediças, espessuras e prazos de entrega é a sua única garantia jurídica e técnica de que receberá exatamente o que comprou.`,
    category: 'Consumidor Final',
    image_url: 'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg',
    created_at: '2026-01-03T09:00:00Z',
  },
  {
    id: '3',
    slug: 'como-funciona-processo-movelaria-on-demand',
    title: 'Como funciona o processo da Movelaria On Demand: do projeto à entrega',
    excerpt:
      'Transparência total. Entenda cada etapa da nossa metodologia exclusiva que garante segurança, prazos cumpridos e a materialização exata do seu sonho.',
    content: `Sabemos que obras e reformas geram ansiedade. Por isso, na Movelaria On Demand, padronizamos nosso processo para eliminar surpresas e garantir que você saiba exatamente em que fase seu projeto está.

## 1. Briefing e Concepção

Tudo começa com uma conversa profunda. Não queremos apenas saber as medidas; queremos entender como você vive. Você cozinha muito? Trabalha em casa? Tem pets? Essas respostas moldam o design funcional do projeto.

## 2. Projeto Técnico e 3D

Nossos designers transformam suas necessidades em um modelo visual realista. Aqui você vê como ficará o ambiente. Mais importante ainda é o detalhamento técnico: definimos cada milímetro, cada puxador e cada tipo de dobradiça antes de cortar qualquer madeira.

## 3. Produção Conectada

Diferente de marcenarias tradicionais, nossa plataforma conecta seu projeto aos melhores profissionais, monitorando a produção. Utilizamos tecnologia de corte de precisão para garantir acabamento industrial com alma artesanal.

## 4. Entrega e Montagem Especializada

A montagem é 50% da qualidade do móvel. Nossas equipes são treinadas para respeitar sua casa, protegendo o piso e limpando o ambiente após a instalação. O ajuste final das portas e gavetas é feito com rigor milimétrico.

## 5. Garantia e Pós-Venda

A relação não acaba na entrega. Mantemos um canal aberto para qualquer necessidade de ajuste futuro, garantindo a longevidade do seu investimento.`,
    category: 'Consumidor Final',
    image_url: 'https://images.pexels.com/photos/5089144/pexels-photo-5089144.jpeg',
    created_at: '2026-03-07T14:30:00Z',
  },

  {
    id: '4',
    slug: 'tendencias-moveis-sob-medida-2025-2025',
    title: 'Tendências de móveis sob medida que estão dominando 2025/2025',
    excerpt:
      'Descubra o que está em alta no design de interiores mundial: tons terrosos, madeira natural e a fusão perfeita entre tecnologia e aconchego.',
    content: `O design de interiores vive um momento de retorno ao natural, sem abrir mão da tecnologia. Para 2025 e 2025, os móveis sob medida deixam de ser apenas caixas funcionais para se tornarem elementos de expressão artística e conforto sensorial.

## O Retorno do Orgânico e Tons Terrosos

O branco total está perdendo espaço para tons de areia, terracota, verdes musgo e amadeirados quentes. A ideia é transformar a casa em um refúgio acolhedor. Formas curvas também aparecem com força, suavizando as quinas de ilhas de cozinha e mesas de cabeceira.

## Madeira Natural e Texturas

Não queremos mais tudo liso e "plastificado". O uso de lâminas de madeira natural, palhinha indiana e texturas que imitam pedra ou tecido nos painéis de MDF traz sofisticação tátil. O toque é tão importante quanto o visual.

## Minimalismo Funcional (Warm Minimalism)

A tendência não é mais o minimalismo frio de laboratório, mas um minimalismo quente. Poucos móveis, mas com muita qualidade e personalidade. Armários que escondem toda a bagunça do dia a dia (como eletrodomésticos na cozinha) permitem que o design limpo prevaleça.

## Tecnologia Invisível

Carregadores por indução embutidos nos tampos das mesas, iluminação LED integrada dentro dos armários com sensores de presença e sistemas de automação ocultos na marcenaria. A casa é inteligente, mas a tecnologia não precisa estar exposta; ela deve servir ao usuário discretamente.`,
    category: 'Design e Tendências',
    image_url: 'https://images.pexels.com/photos/5089167/pexels-photo-5089167.jpeg',
    created_at: '2026-01-04T11:00:00Z',
  },
  {
    id: '5',
    slug: 'alinhar-estetica-funcionalidade-moveis-planejados',
    title: 'Como alinhar estética e funcionalidade em móveis planejados',
    excerpt:
      'Um móvel bonito que não funciona é apenas uma escultura cara. Aprenda a equilibrar o visual impactante com a usabilidade prática do dia a dia.',
    content: `O maior desafio de um projeto de interiores é o equilíbrio. Muitas vezes, o cliente se apaixona por uma referência do Pinterest que é inviável para o seu espaço ou rotina. O segredo está em fazer o design trabalhar a favor da função.

## O Design Deve Resolver Problemas

Antes de decidir a cor do MDF, precisamos resolver os problemas do ambiente. Se a cozinha é pequena, a estética deve focar em cores claras e linhas horizontais para ampliar. Se o pé-direito é alto, armários verticais podem otimizar o armazenamento sem pesar visualmente.

## Exemplos Reais de Equilíbrio

### Cozinhas Integradas
A estética pede beleza, pois a cozinha virou sala de estar. A funcionalidade pede resistência. A solução: usar materiais nobres nas frentes (estética) e revestimentos internos de alta resistência a umidade e gordura (funcionalidade), além de ocultar a "bagunça" com portas escamoteáveis.

### Quartos Compactos
Em vez de encher o quarto de armários e perder circulação, utilizamos camas com baú, cabeceiras com nichos laterais e armários com portas de correr espelhadas. O espelho traz a estética de amplitude, e o móvel resolve o armazenamento.

## A Importância do Briefing Sincero

Para alinhar estética e função, você precisa ser honesto sobre seus hábitos. Se você não é organizado, prateleiras abertas (estilo industrial) serão um problema visual, não uma solução. O móvel sob medida ideal é aquele que abraça sua realidade e a torna mais bonita.`,
    category: 'Design e Tendências',
    image_url: 'https://images.pexels.com/photos/5089117/pexels-photo-5089117.jpeg',
    created_at: '2026-01-08T16:00:00Z',
  },

  {
    id: '6',
    slug: 'qual-melhor-madeira-moveis-sob-medida',
    title: 'Qual a melhor madeira para móveis sob medida?',
    excerpt:
      'Carvalho, Freijó, Imbuia ou MDF? Entenda as características de cada material e descubra qual oferece o melhor custo-benefício para o seu projeto.',
    content: `Essa é a dúvida campeã. A resposta curta é: depende do uso e do orçamento. Não existe uma "melhor madeira" universal, mas existe a escolha certa para cada situação.

## Madeiras Nobres (Lâminas Naturais)

Quando falamos de acabamento de alto padrão, madeiras como Freijó, Carvalho Americano e Nogueira são as favoritas. Elas geralmente são aplicadas como lâminas (finas capas de madeira real) sobre uma base de MDF.

- Onde usar: Painéis de destaque, frentes de móveis na sala, mesas de jantar.
- Vantagem: Exclusividade. Cada veio da madeira é único.

## MDF (Revestido ou Liso) 

É o padrão da indústria mundial. Feito de fibras de madeira aglutinadas, é perfeito para receber pintura (laca) ou revestimentos melamínicos (os famosos amadeirados sintéticos).

- Onde usar: Estruturas de armários, portas, cozinhas, quartos.
- Vantagem: Superfície perfeitamente lisa, estabilidade e custo-benefício.

## Compensado Naval

Menos comum em móveis residenciais finos, mas excelente para áreas úmidas ou móveis com estética industrial/escandinava onde as bordas ficam aparentes.

- Onde usar: Gabinetes de banheiro, áreas externas cobertas.
- Vantagem: Altíssima resistência à umidade e estrutura robusta.

## O Veredito

Para 90% dos projetos residenciais, a combinação inteligente é: estrutura interna em MDF branco (custo e higiene), e frentes/áreas visíveis em MDF revestido ou lâmina de madeira natural (estética). Essa mescla garante um móvel durável, bonito e com preço justo.`,
    category: 'Madeira e Materiais',
    image_url: 'https://images.pexels.com/photos/985287/pexels-photo-985287.jpeg',
    created_at: '2026-01-06T10:00:00Z',
  },
  {
    id: '7',
    slug: 'mdf-mdp-madeira-macica-qual-escolher',
    title: 'MDF, MDP ou madeira maciça: qual escolher?',
    excerpt:
      'Desmitificamos as siglas. Saiba tecnicamente quando usar MDF, quando o MDP é superior e por que a madeira maciça é um altamente específico.',
    content: `Há muitos mitos no mercado, como "MDP é material ruim" ou "Só madeira maciça presta". A tecnologia evoluiu e cada material tem sua função técnica específica.

## MDF (Revestido ou Liso)
Placa de fibra de média densidade. É um material denso e uniforme.

- Melhor uso: Cortes curvos, usinagens, acabamentos em laca e portas detalhadas. É o coringa da marcenaria sob medida.

## MDP
Placa de partículas de média densidade. Ao contrário do que dizem, o MDP de boa qualidade é excelente para suportar peso e segurar parafusos, pois suas partículas maiores travam melhor a rosca.

- Melhor uso: Prateleiras longas, caixas estruturais de armários e portas retas. Ele empena menos que o MDF em grandes vãos.

## Madeira Maciça
É a madeira pura, extraída da árvore. É "viva", ou seja, trabalha (expande e contrai) com a temperatura.

- Melhor uso: Cadeiras, pés de mesa, estruturas que exigem resistência mecânica extrema ou peças de design escultural.
- Contras: Custo elevado, peso e impacto ambiental se não for certificada.

## A Escolha Inteligente
Não se prenda ao material, mas à qualidade da fabricação. Um MDP de alta tecnologia da Duratex ou Arauco é infinitamente superior a uma madeira maciça mal seca. Na Movelaria On Demand, especificamos o material ideal para cada parte do seu móvel, garantindo que você não pague a mais sem necessidade e nem tenha problemas de estrutura.`,
    category: 'Madeira e Materiais',
    image_url:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop',
    created_at: '2026-01-02T13:00:00Z',
  },

  {
    id: '8',
    slug: 'como-aproveitar-espaco-apartamento-pequeno',
    title: 'Como aproveitar cada centímetro do seu apartamento com móveis sob medida',
    excerpt:
      'Apartamentos compactos exigem soluções gigantes. Veja como a verticalização e móveis multifuncionais podem dobrar a sensação de espaço.',
    content: `Viver em espaços pequenos não significa viver apertado. O segredo está na inteligência do projeto. Móveis sob medida são a única solução real para apartamentos compactos (studios e 1 dormitório), pois móveis prontos raramente encaixam perfeitamente nos vãos disponíveis.

## Verticalização: O Espaço Esquecido

Muitas pessoas esquecem do espaço entre o topo do armário e o teto. Em apartamentos pequenos, armários que vão até o teto são obrigatórios. Nas partes mais altas, guardamos o que se usa pouco (malas, edredons, decoração de natal), liberando a parte baixa para o dia a dia.

## Móveis Multifuncionais

- Mesa retrátil: Embutida na estante da sala ou na bancada da cozinha, aparece só na hora das refeições.
- Sofá com baú: Espaço extra para roupas de cama.
- Bancos que viram mesa de centro: Versatilidade para receber visitas.

## A Mágica dos Espelhos e Cores Claras

Integramos espelhos nas portas dos armários sob medida em locais estratégicos para duplicar a percepção visual e refletir a luz natural. Cores claras na marcenaria (off-white, cinza claro, madeira lavada) evitam a sensação de clausura.

## Integração de Ambientes

O móvel sob medida pode funcionar como divisor de ambientes sem bloquear a luz. Uma estante vazada entre a sala e o quarto, por exemplo, separa as funções mantendo a amplitude.`,
    category: 'Espaços Inteligentes',
    image_url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    created_at: '2026-01-10T09:00:00Z',
  },
  {
    id: '9',
    slug: 'home-office-sob-medida-produtividade',
    title: 'Home office sob medida: produtividade, ergonomia e conforto',
    excerpt:
      'Trabalhar de casa exige mais do que uma mesa improvisada. Crie um ambiente profissional que protege sua saúde e aumenta seu foco.',
    content: `O home office deixou de ser provisório para ser permanente. E trabalhar na mesa de jantar não funciona a longo prazo. Um escritório sob medida é um investimento na sua carreira e na sua saúde física.

## Ergonomia é Lei

A altura padrão de uma mesa é 75cm, mas isso varia conforme sua estatura. No projeto sob medida, ajustamos a bancada para você. Prevemos também o espaço correto para as pernas e a posição do monitor para evitar dores no pescoço.

## Organização Mental = Organização Visual

Papéis, cabos e canetas espalhados destroem a concentração. Projetamos:

- Calhas para cabos: Adeus ao emaranhado de fios.
- Gavetas com divisórias: Cada item no seu lugar.
- Armários aéreos: Para guardar documentação e livros, mantendo a área de trabalho limpa.

## Iluminação Integrada

A marcenaria pode incluir fitas de LED embutidas nas prateleiras acima da mesa. Isso garante uma luz direta e sem sombras sobre o teclado e anotações, essencial para quem trabalha à noite ou em ambientes com pouca luz natural.

## Personalização do Espaço

Seu escritório não precisa parecer um cubículo corporativo cinza. Ele pode ter a sua personalidade, com nichos para coleções, cores que estimulam a criatividade e materiais que trazem conforto térmico.`,
    category: 'Espaços Inteligentes',
    image_url: 'https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg',
    created_at: '2026-01-10T15:00:00Z',
  },

  {
    id: '10',
    slug: 'moveis-sustentaveis-consumo-consciente',
    title: 'Móveis sustentáveis: como escolher sem cair no marketing verde',
    excerpt:
      'Sustentabilidade vai além do selo. Entenda o impacto da produção local, a durabilidade como fator ecológico e a procedência da madeira.',
    content: `Ser sustentável na decoração não é apenas usar materiais reciclados. É sobre escolhas conscientes que reduzem o impacto ambiental ao longo de todo o ciclo de vida do produto.

## A Durabilidade é Ecológica

O móvel mais sustentável é aquele que você não precisa trocar. Um móvel sob medida que dura 20 anos gera muito menos resíduo do que três móveis prontos descartáveis comprados no mesmo período. "Comprar bem para comprar uma vez só" é o mantra do consumo consciente.

## Certificação da Madeira (FSC)

A garantia de que a madeira ou o MDF vêm de florestas plantadas e manejadas, e não de desmatamento ilegal, é o selo FSC. Todos os nossos fornecedores de painéis possuem essa certificação rigorosa.

## Produção Local e Pegada de Carbono

Ao conectar você a marceneiros da sua região através da nossa plataforma, reduzimos drasticamente a necessidade de transporte de longa distância. Menos caminhões na estrada significam menos emissão de CO2.

## Economia Circular e Menos Desperdício

Nossos projetos utilizam softwares de otimização de corte (plano de corte). Isso significa que aproveitamos o máximo de cada chapa de madeira, gerando o mínimo de retalhos e sobras. O design inteligente também é um design limpo.`,
    category: 'Sustentabilidade',
    image_url: 'https://images.pexels.com/photos/7641859/pexels-photo-7641859.jpeg',
    created_at: '2026-01-11T11:00:00Z',
  },

  {
    id: '11',
    slug: 'conectar-marceneiros-novos-clientes',
    title: 'Como a Movelaria On Demand conecta marceneiros a novos clientes',
    excerpt:
      'Cansado de correr atrás de clientes e levar calote? Descubra como nossa plataforma garante fluxo de projetos e segurança financeira para sua marcenaria.',
    content: `Para muitos marceneiros talentosos, a parte mais difícil do negócio não é produzir, é vender e cobrar. A Movelaria On Demand nasceu para resolver exatamente essa dor, permitindo que você foque no que faz de melhor: criar móveis incríveis.

## O Fim da Prospecção Exaustiva

Nós investimos pesado em marketing digital e captação de clientes. Os projetos chegam prontos e detalhados para você. Não é preciso gastar horas fazendo orçamentos que não fecham.

## Segurança Financeira (Risco Zero)

Talvez o maior benefício: a garantia de recebimento. O cliente paga para a plataforma, e a plataforma repassa para você conforme o cronograma. Acabou o risco de inadimplência, cheque sem fundo ou "te pago o resto mês que vem".

## Projetos Técnicos de Verdade

Chega de rascunhos em guardanapo. Enviamos projetos executivos detalhados, com medidas, especificações de material e planos de corte. Isso reduz erros de produção e retrabalho, aumentando sua margem de lucro.

## Crescimento Escalonável

Ao trabalhar conosco, você padroniza seus processos e consegue atender mais clientes com a mesma estrutura. Somos parceiros do seu crescimento, não apenas um canal de vendas.`,
    category: 'Marceneiros e Parceiros',
    image_url: 'https://images.pexels.com/photos/4963433/pexels-photo-4963433.jpeg',
    created_at: '2026-01-09T08:00:00Z',
  },
  {
    id: '12',
    slug: 'futuro-marcenaria-tecnologia',
    title: 'O futuro da marcenaria: tecnologia, personalização e escala',
    excerpt:
      'A marcenaria artesanal não morreu, ela evoluiu. Entenda como softwares de projeto, CNCs e plataformas digitais estão redefinindo o setor.',
    content: `O setor moveleiro está passando por uma revolução silenciosa. O modelo antigo de "marcenaria de fundo de quintal" está dando lugar a oficinas modernas, conectadas e altamente eficientes.

## A Digitalização do Processo

O marceneiro moderno opera tanto o computador quanto a serra. Softwares de modelagem 3D e integração direta com máquinas de corte (CNCs) permitem precisão milimétrica que o olho humano não consegue acompanhar. Isso não tira o valor do artesão, mas potencializa sua capacidade.

## Novos Modelos de Negócio

Plataformas como a Movelaria On Demand introduzem o conceito de "Marcenaria as a Service". A descentralização da produção permite que pequenas marcenarias tenham acesso a grandes projetos que antes ficavam restritos a grandes fábricas.

## O Papel do Marceneiro Consultor

Com a máquina fazendo o trabalho pesado e repetitivo, o marceneiro se torna um especialista em soluções e montagem. O valor está no acabamento fino, na regulagem perfeita e na solução de problemas complexos na obra, algo que robôs ainda não fazem.`,
    category: 'Marceneiros e Parceiros',
    image_url: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    created_at: '2026-01-11T14:00:00Z',
  },
  {
    id: '13',
    slug: 'vendas-moveis-sob-medida-alto-valor',
    title: 'Vendas de móveis sob medida: como fechar mais projetos de alto valor',
    excerpt:
      'Vender móveis não é vender madeira, é vender sonhos e soluções. Técnicas consultivas para vendedores e arquitetos aumentarem sua taxa de conversão.',
    content: `O cliente de móveis sob medida não compra MDF; ele compra a casa organizada, o elogio da visita, o conforto da família. Entender essa psicologia é a chave para vendas de alto valor (High Ticket).

## Abordagem Consultiva x Tirador de Pedido

O tirador de pedido pergunta "o que você quer?". O consultor pergunta "qual o seu problema?". Ao investigar as dores do cliente (falta de espaço, umidade, design ultrapassado), você se posiciona como autoridade e a venda acontece naturalmente como consequência da solução apresentada.

## Apresentação é Tudo

Um projeto de R$ 30.000,00 não pode ser apresentado num rascunho rápido. O uso de renders realistas, amostras físicas de materiais na reunião e uma proposta comercial clara e organizada transmitem a confiança necessária para o cliente abrir a carteira.

## Contorne Objeções com Valor, não Preço

Quando o cliente diz "está caro", ele geralmente quer dizer "não vi valor suficiente nisso". Em vez de dar desconto imediatamente, reforce os diferenciais: a durabilidade das ferragens, a garantia, a exclusividade do design e a segurança da entrega. Preço é o que se paga, valor é o que se leva.`,
    category: 'Marceneiros e Parceiros',
    image_url: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg',
    created_at: '2026-01-12T09:00:00Z',
  },
];
