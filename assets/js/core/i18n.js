const STORAGE_KEY = "pdca_lab_language";
const SUPPORTED_LANGUAGES = ["es", "ca", "en"];

const dictionaries = {
  es: {
    nav: {
      home: "Selector",
      parasuraman: "Calidad",
      pdcaTeam: "PDCA",
      pvca: "PVCA"
    },
    common: {
      language: "Idioma"
    },
    footer: {
      author: "Diseñado por José Luis Miralles Bono",
      repo: "Repositorio GitHub",
      horchata: "Invítame a una horchata"
    },
    home: {
      hero: {
        title: "Laboratorio interactivo",
        subtitle: "Simuladores para formar en mejora de la calidad educativa.",
        block1: {
          title: "Aprendizaje en capas",
          body: "Versión paso a paso para comprender la definición y versión avanzada para practicar decisiones."
        },
        block2: {
          title: "Comparte criterios",
          body: "Mismo lenguaje visual y mismas métricas para comparar modelos entre sí."
        },
        block3: {
          title: "GitHub Pages ready",
          body: "Arquitectura estática, rápida y fácil de mantener sin backend."
        }
      },
      simulators: {
        title: "Seleccionador de simuladores"
      },
      cards: {
        parasuraman: {
          status: "Disponible",
          title: "Definición de calidad de Parasuraman",
          description:
            "Recorre la definición frase a frase con una animación sincronizada del punto percibido, esperado y calidad.",
          mode: "Paso a paso + avanzado",
          cta: "Entrar"
        },
        pdca: {
          status: "Disponible",
          title: "PDCA",
          description:
            "Lectura guiada del concepto, visual principal del ciclo y tipologías de malfuncionamiento.",
          mode: "Definición + ciclo + fallos",
          cta: "Entrar"
        },
        pvca: {
          status: "Disponible",
          title: "PVCA y malfuncionamientos",
          description: "Presión para el cambio, Visión compartida, Capacidad y Primeras acciones con fallos por ausencia.",
          mode: "Definición + malfuncionamiento",
          cta: "Entrar"
        }
      },
      roadmap: {
        title: "Ruta de desarrollo",
        item1: "Parasuraman: modo paso a paso + modo avanzado protegido con contraseña demo.",
        item2: "PDCA: flujo de roles e información en ciclos colectivos.",
        item3: "PVCA: diagnóstico interactivo de malfuncionamientos y efectos acumulados."
      }
    },
    parasuraman: {
      title: "Simulador de Calidad de Parasuraman",
      subtitle:
        "La calidad percibida se calcula como distancia entre lo que esperamos y lo que obtenemos. Esta herramienta modela su carácter subjetivo, acumulativo y cambiante.",
      tag: {
        simple: "Modo simple",
        guided: "Caso guiado",
        evaluation: "Con evaluación"
      },
      mode: {
        simple: "Modo simple",
        guided: "Modo guiado"
      },
      controls: {
        expected: "Expectativa (E)",
        adaptationRate: "Ritmo de subida de expectativa al sobrecumplir",
        adaptationToggle: "Subir expectativas automáticamente cuando P > E",
        parameters: "Parámetros que conforman la percepción",
        weight: "Peso",
        observed: "Resultado obtenido"
      },
      actions: {
        run: "Ejecutar ciclo",
        auto: "Auto 5 ciclos",
        reset: "Reiniciar"
      },
      visual: {
        expectedMark: "E",
        perceivedMark: "P"
      },
      metrics: {
        expected: "Expectativa",
        perceived: "Percepción",
        distance: "Distancia",
        quality: "Calidad"
      },
      history: {
        cycle: "Ciclo",
        expected: "E",
        perceived: "P",
        distance: "|E-P|",
        quality: "Q",
        empty: "Aún no hay ciclos ejecutados."
      },
      parameters: {
        outcomes: "Resultados de aprendizaje",
        clarity: "Claridad didáctica",
        support: "Acompañamiento",
        feedback: "Feedback útil",
        equity: "Equidad de atención"
      },
      insight: {
        neutral: "Ajusta parámetros y ejecuta ciclos para observar cómo se construye la percepción en el tiempo.",
        excellent: "Distancia baja: la calidad percibida se aproxima a la expectativa actual.",
        low: "Distancia alta: la percepción queda lejos de lo esperado. Hace falta rediseñar intervención.",
        aboveExpected:
          "Sobrecumplimiento detectado: al subir expectativas, el punto vuelve a desplazarse y exige nueva mejora.",
        stable: "Percepción acumulada: no cambia de golpe, se construye por resultados sucesivos."
      },
      guided: {
        title: "Caso guiado con evaluación",
        description:
          "Analiza un caso en 3 decisiones. Cada decisión modifica parámetros, expectativa y calidad percibida. Se evalúa comprensión del modelo.",
        progress: "Progreso:",
        start: "Iniciar caso",
        apply: "Aplicar decisión",
        selectOption: "Selecciona una opción antes de continuar.",
        notStarted: "Pulsa “Iniciar caso” para comenzar.",
        case: {
          title: "Centro educativo: mejora de la retroalimentación",
          description:
            "Un equipo docente detecta que, pese a trabajar mucho, el alumnado percibe calidad irregular. Debes decidir cómo intervenir en ciclos sucesivos."
        },
        steps: {
          step1: {
            prompt: "Paso 1: ¿qué priorizas para reducir rápidamente la distancia inicial?",
            a: "Subir exigencia de resultados sin cambiar metodología.",
            b: "Reforzar claridad y feedback con ajustes de aula.",
            c: "Mantener todo igual y esperar al próximo trimestre.",
            feedbackA:
              "Subir exigencia sin apoyo incrementa expectativa más rápido que la percepción: suele empeorar la distancia.",
            feedbackB:
              "Buena decisión: mejoras parámetros que afectan percepción real y permiten reducir distancia con evidencia.",
            feedbackC:
              "Sin cambios, la percepción apenas evoluciona y el ciclo pierde capacidad de mejora."
          },
          step2: {
            prompt: "Paso 2: tras una ligera mejora, ¿cómo gestionas la subjetividad de la calidad?",
            a: "Usar una media global única para todo el alumnado.",
            b: "Diferenciar grupos y recoger expectativas específicas.",
            c: "Eliminar encuestas y medir solo calificaciones.",
            feedbackA:
              "La media única puede ocultar poblaciones con necesidades distintas y sesgar la reflexión.",
            feedbackB:
              "Buena decisión: reconoce la dimensión subjetiva y evita sesgos por dilución de perfiles.",
            feedbackC:
              "Reducir la información a una sola métrica limita el aprendizaje del ciclo."
          },
          step3: {
            prompt: "Paso 3: aparece sobrecumplimiento puntual (P > E). ¿Qué haces?",
            a: "Consolidar y planificar una nueva meta, anticipando expectativas más altas.",
            b: "Cerrar el proceso porque ya se alcanzó la calidad máxima.",
            c: "Subir expectativa al máximo sin cambiar capacidad del equipo.",
            feedbackA:
              "Buena decisión: el modelo asume que al sobrecumplir se fijan nuevas expectativas y conviene planificar el siguiente salto.",
            feedbackB:
              "El proceso no se cierra: la percepción de calidad es dinámica y vuelve a desplazarse.",
            feedbackC:
              "Elevar expectativas sin reforzar capacidad suele reabrir una distancia alta en el siguiente ciclo."
          }
        },
        feedbackStart:
          "Caso iniciado. Aplica decisiones y observa cómo cambia la distancia entre expectativa y percepción.",
        summaryPending: "Completa los 3 pasos para obtener la evaluación final.",
        summaryTitle: "Resultado de evaluación",
        scoreLabel: "Puntuación",
        summaryHigh: "Dominio alto del modelo: conectas subjetividad, distancia y evolución temporal.",
        summaryMedium: "Dominio medio: entiendes la distancia, pero aún hay margen en análisis de contexto y expectativas.",
        summaryLow: "Dominio inicial: conviene revisar la relación entre intervención, percepción acumulada y expectativas dinámicas."
      }
    },
    parasuramanSimple: {
      title: "Definición de Calidad",
      subtitle:
        "Esta definición de calidad está basada en la referencia bibliográfica: 📑 Parasuraman et al. (1985). <i>Journal of Marketing</i>, 49(4), 41–50. DOI: 10.2307/1251430",
      badge: "Paso a paso",
      advancedLink: "Abrir Parasuraman Avanzado (demo)",
      readerTitle: "Lectura guiada",
      animationTitle: "Animación del modelo",
      parameterTitle: "Parámetros que van conformando la percepción",
      parameterApprox: "Estos valores numéricos son solo una aproximación expresada matemáticamente.",
      counter: "Paso {{current}} de {{total}}",
      actions: {
        prev: "Atrás",
        next: "Adelante"
      },
      labels: {
        perceived: "Percibido",
        expected: "Esperado"
      },
      metrics: {
        perceived: "Percibido",
        qualityPoint: "Calidad (índice)",
        expected: "Esperado",
        distance: "Distancia |P-E|"
      },
      parameters: {
        p1: "Parámetro 1",
        p2: "Parámetro 2",
        p3: "Parámetro 3"
      },
      steps: {
        s1: "La calidad es un punto de localización variable en una línea que va desde lo que nosotros percibimos a lo que esperamos.",
        s2: "Cuanto más se acerca el punto a lo que esperamos: percibimos mayor calidad.",
        s3: "Cuando más se aleja el punto de lo que esperamos percibimos menor calidad.",
        s4: "La calidad es una percepción subjetiva.",
        s5: "La calidad es inversamente proporcional a la distancia entre lo que obtenemos y lo que esperamos.",
        s6: "La percepción de la calidad no es instantánea. Se va conformando por la obtención de resultados de distintos parámetros.",
        s7: "El punto puede estar por encima de lo que esperamos; se cumplen con creces todas nuestras expectativas.",
        s8: "Pero automáticamente fijamos otras más altas, y el punto vuelve a estar por debajo."
      },
      hints: {
        s1: "Primer encuadre: línea base y dos puntos de referencia (percibido y esperado).",
        s2: "El punto percibido se aproxima al esperado: aumenta la calidad.",
        s3: "El punto percibido se aleja del esperado: disminuye la calidad.",
        s4: "La posición percibida puede variar según la mirada de cada persona o grupo.",
        s5: "Observa cómo al aumentar distancia |P-E|, la calidad percibida cae.",
        s6: "Los parámetros no impactan de golpe: su efecto se acumula progresivamente.",
        s7: "Cuando P supera E, la calidad sigue aumentando.",
        s8: "Las expectativas se elevan y vuelven a abrir distancia, reiniciando la mejora."
      },
      notes: {
        s1: "Referencia inicial del modelo.",
        s2: "Distancia corta entre P y E.",
        s3: "Distancia larga entre P y E.",
        s4: "Dos personas pueden interpretar la misma experiencia de forma distinta.",
        s5: "Relación inversa: más distancia, menos calidad percibida.",
        s6: "Efecto acumulado de resultados sobre varios parámetros.",
        s7: "Sobrecumplimiento puntual detectado.",
        s8: "Nueva expectativa más alta: el ciclo vuelve a activarse."
      }
    },
    parasuramanAdvanced: {
      title: "Parasuraman Avanzado",
      subtitle: "Versión completa con simulación dinámica, modo guiado y evaluación.",
      lock: {
        title: "Acceso restringido",
        subtitle: "Introduce la contraseña para abrir la versión avanzada.",
        input: "Contraseña",
        action: "Entrar",
        hint: "Contraseña de demostración requerida.",
        error: "Contraseña incorrecta. Prueba con \"demo\"."
      }
    },
    pdca: {
      title: "PDCA",
      subtitle:
        "Módulo base para formación de gestores: primero definición guiada, luego visual principal del ciclo y después malfuncionamientos.",
      aliases: {
        title: "Múltiples denominaciones:",
        a1: "Círculo de Deming (de William Edwards Deming, que se basó en Walter Andrew Shewhart)",
        a2: "Círculo de Gabo",
        a3: "Ciclo de mejora",
        a4: "Espiral de mejora continua",
        a5: "PDCA (del inglés: Plan Do Check Act)"
      },
      badges: {
        definition: "Definición guiada",
        visual: "Visual del ciclo",
        malfunctions: "Malfuncionamientos"
      },
      actions: {
        prev: "Atrás",
        next: "Adelante",
        prevPhase: "Fase anterior",
        nextPhase: "Fase siguiente",
        prevType: "Tipo anterior",
        nextType: "Tipo siguiente"
      },
      definition: {
        title: "1) Lectura guiada del concepto",
        lead: "Lee la definición del ciclo en pasos cortos y ordenados.",
        counter: "Paso {{current}} de {{total}}",
        steps: {
          s1: "PDCA es un ciclo de mejora continua con cuatro fases conectadas.",
          s2: "Planificar define objetivos, criterios y el diseño de intervención.",
          s3: "Desarrollar ejecuta lo planificado con los recursos y roles disponibles.",
          s4: "Comprobar evalúa resultados y contrasta evidencia frente a objetivos.",
          s5: "Actuar ajusta decisiones, consolida lo que funciona y corrige lo que no.",
          s6: "En equipos, el valor del ciclo depende de la conexión real entre personas, información y fases."
        }
      },
      visual: {
        title: "2) Visual principal del ciclo",
        lead: "El paquete de información debe pasar por las cuatro fases sin perder trazabilidad.",
        input: "Entrada:",
        process: "Proceso:",
        output: "Salida:",
        handoff: "Traspaso visible entre fases:",
        handoffCaption: "Salida de {{from}} → Entrada de {{to}}",
        handoffOutput: "Salida actual",
        handoffInput: "Entrada siguiente"
      },
      phase: {
        plan: {
          label: "Planificar",
          short: "P",
          input: "diagnóstico, necesidades y metas",
          process: "priorizar, diseñar, asignar responsables",
          output: "plan operativo con criterios de éxito"
        },
        do: {
          label: "Desarrollar",
          short: "D",
          input: "plan operativo",
          process: "implementación en aula/centro y coordinación",
          output: "evidencias de ejecución y primeros resultados"
        },
        check: {
          label: "Comprobar",
          short: "C",
          input: "evidencias y resultados",
          process: "análisis, contraste de objetivos y detección de brechas",
          output: "juicio fundamentado sobre eficacia"
        },
        act: {
          label: "Actuar",
          short: "A",
          input: "juicio fundamentado",
          process: "ajustar decisiones, estandarizar mejoras, corregir fallos",
          output: "nuevo punto de partida para el siguiente ciclo"
        }
      },
      malfunctions: {
        title: "3) Tipos de malfuncionamiento",
        lead: "Tres fallos frecuentes reducen el potencial del PDCA aunque aparentemente el ciclo siga girando.",
        effectLabel: "Efecto observado:",
        potential: "Potencial de mejora conservado: {{value}}%",
        type1: {
          title: "Tipo 1 · Fluidez de información deficiente",
          description:
            "La información llega incompleta, sesgada o tarde entre fases. El ciclo se completa, pero decide con base frágil.",
          effect: "Se mantiene la actividad, pero baja la calidad de las decisiones."
        },
        type2: {
          title: "Tipo 2 · Salto de fase",
          description:
            "Se omite una fase crítica (normalmente reflexión o ajuste) y se repite el ciclo sin verdadera renovación.",
          effect: "Hay repetición operativa sin mejora estructural."
        },
        type3: {
          title: "Tipo 3 · Actores desconectados del ciclo",
          description:
            "Quien ejecuta una fase no comparte propósito ni lógica del ciclo completo, o no participó en su planificación.",
          effect: "Aparece cumplimiento parcial y se fragmenta la mejora."
        }
      },
      games: {
        title: "4) Minijuegos de práctica",
        lead: "Dos ejercicios rápidos para fijar la secuencia del ciclo y el traspaso de información entre fases.",
        actions: {
          shuffle: "Mezclar",
          check: "Comprobar",
          reset: "Reiniciar"
        },
        order: {
          title: "Juego 1 · Ordena las fases",
          instructions: "Reordena las fases hasta obtener la secuencia correcta del ciclo.",
          moveUp: "Subir fase",
          moveDown: "Bajar fase",
          feedbackSuccess: "Orden correcto: Planificar → Desarrollar → Comprobar → Actuar.",
          feedbackPartial: "Tienes {{correct}} de {{total}} fases en posición correcta."
        },
        match: {
          title: "Juego 2 · Relaciona la información entre fases",
          instructions:
            "Para cada bloque de información, indica entre qué dos fases circula (salida de la primera y entrada de la siguiente).",
          infoLabel: "Información transferida",
          selectPlaceholder: "Selecciona tramo del ciclo",
          linkTemplate: "{{from}} → {{to}}",
          feedbackIncomplete: "Completa todas las relaciones antes de comprobar.",
          feedbackSuccess: "Relación correcta en los 4 tramos del ciclo.",
          feedbackPartial: "Has acertado {{correct}} de {{total}} relaciones."
        }
      }
    },
    pvca: {
      title: "PVCA",
      subtitle:
        "Modelo de cambio con cuatro condiciones que deben estar presentes para que el proceso avance con coherencia.",
      actions: {
        reset: "Reiniciar"
      },
      badges: {
        definition: "Modo definición",
        malfunction: "Modo malfuncionamiento"
      },
      modes: {
        definition: "Definición",
        malfunction: "Malfuncionamiento"
      },
      lead: {
        definition: "Haz clic en cada caja para ver la definición de esa fase.",
        malfunction: "Haz clic en una caja para simular su ausencia y ver el problema asociado."
      },
      problem: {
        definition: "Selecciona una fase para abrir su definición.",
        malfunction: "Selecciona una fase para eliminarla temporalmente del modelo."
      },
      phases: {
        pressure: {
          label: "Presión para el cambio",
          definition: "Evidencias y razones que muestran que continuar igual ya no mejora resultados."
        },
        vision: {
          label: "Visión compartida",
          definition: "Imagen común del cambio deseado y de por qué merece la pena asumirlo."
        },
        capacity: {
          label: "Capacidad para cambiar",
          definition: "Recursos, competencias y organización necesarios para ejecutar el cambio."
        },
        actions: {
          label: "Primeras acciones",
          definition: "Primeros pasos concretos que convierten la intención en avance real."
        }
      },
      malfunctions: {
        pressure: "Falta 1: Nunca será importante",
        vision: "Falta 2: Falta de consenso e implicación",
        capacity: "Falta 3: Frustración e impotencia",
        actions: "Falta 4: Nunca será urgente, no despegará"
      },
      modal: {
        close: "Cerrar"
      }
    },
    placeholder: {
      shared: {
        now: "Estructura preparada",
        back: "Volver al selector"
      },
      pdca: {
        title: "PDCA",
        subtitle: "Modelo planificado: pendiente de contenido y simulación detallada contigo.",
        next: "En la siguiente fase añadiremos roles, flujo de información y casos de coordinación de ciclo colectivo."
      },
      pvca: {
        title: "PVCA y malfuncionamientos",
        subtitle: "Modelo planificado: pendiente de contenido y simulación detallada contigo.",
        next: "En la siguiente fase añadiremos los malfuncionamientos tipo 1, 2 y 3 con decisiones guiadas y diagnóstico."
      }
    }
  },
  ca: {
    nav: {
      home: "Selector",
      parasuraman: "Qualitat",
      pdcaTeam: "PDCA",
      pvca: "PVCA"
    },
    common: {
      language: "Idioma"
    },
    footer: {
      author: "Dissenyat per José Luis Miralles Bono",
      repo: "Repositori GitHub",
      horchata: "Convida'm a una orxata"
    },
    home: {
      hero: {
        title: "Laboratori interactiu",
        subtitle: "Simuladors per a formar en millora de la qualitat educativa.",
        block1: {
          title: "Aprenentatge per capes",
          body: "Versió pas a pas per a entendre la definició i versió avançada per a practicar decisions."
        },
        block2: {
          title: "Comparteix criteris",
          body: "Mateix llenguatge visual i mateixes mètriques per a comparar models entre si."
        },
        block3: {
          title: "GitHub Pages ready",
          body: "Arquitectura estàtica, ràpida i fàcil de mantindre sense backend."
        }
      },
      simulators: {
        title: "Selector de simuladors"
      },
      cards: {
        parasuraman: {
          status: "Disponible",
          title: "Definició de qualitat de Parasuraman",
          description:
            "Recorre la definició frase a frase amb una animació sincronitzada del punt percebut, esperat i qualitat.",
          mode: "Pas a pas + avançat",
          cta: "Entrar"
        },
        pdca: {
          status: "Disponible",
          title: "PDCA",
          description:
            "Lectura guiada del concepte, visual principal del cicle i tipologies de malfuncionament.",
          mode: "Definició + cicle + falles",
          cta: "Entrar"
        },
        pvca: {
          status: "Disponible",
          title: "PVCA i malfuncionaments",
          description: "Pressió per al canvi, Visió compartida, Capacitat i Primeres accions amb falles per absència.",
          mode: "Definició + malfuncionament",
          cta: "Entrar"
        }
      },
      roadmap: {
        title: "Ruta de desenvolupament",
        item1: "Parasuraman: mode pas a pas + mode avançat protegit amb contrasenya demo.",
        item2: "PDCA: flux de rols i informació en cicles col·lectius.",
        item3: "PVCA: diagnòstic interactiu de malfuncionaments i efectes acumulats."
      }
    },
    parasuraman: {
      title: "Simulador de Qualitat de Parasuraman",
      subtitle:
        "La qualitat percebuda es calcula com a distància entre allò que esperem i allò que obtenim. Esta ferramenta modela el seu caràcter subjectiu, acumulatiu i canviant.",
      tag: {
        simple: "Mode simple",
        guided: "Cas guiat",
        evaluation: "Amb avaluació"
      },
      mode: {
        simple: "Mode simple",
        guided: "Mode guiat"
      },
      controls: {
        expected: "Expectativa (E)",
        adaptationRate: "Ritme de pujada d'expectativa en sobrecompliment",
        adaptationToggle: "Pujar expectatives automàticament quan P > E",
        parameters: "Paràmetres que conformen la percepció",
        weight: "Pes",
        observed: "Resultat obtingut"
      },
      actions: {
        run: "Executar cicle",
        auto: "Auto 5 cicles",
        reset: "Reiniciar"
      },
      visual: {
        expectedMark: "E",
        perceivedMark: "P"
      },
      metrics: {
        expected: "Expectativa",
        perceived: "Percepció",
        distance: "Distància",
        quality: "Qualitat"
      },
      history: {
        cycle: "Cicle",
        expected: "E",
        perceived: "P",
        distance: "|E-P|",
        quality: "Q",
        empty: "Encara no hi ha cicles executats."
      },
      parameters: {
        outcomes: "Resultats d'aprenentatge",
        clarity: "Claredat didàctica",
        support: "Acompanyament",
        feedback: "Feedback útil",
        equity: "Equitat d'atenció"
      },
      insight: {
        neutral: "Ajusta paràmetres i executa cicles per a observar com es construeix la percepció en el temps.",
        excellent: "Distància baixa: la qualitat percebuda s'aproxima a l'expectativa actual.",
        low: "Distància alta: la percepció queda lluny del que s'esperava. Cal redissenyar la intervenció.",
        aboveExpected:
          "Sobrecompliment detectat: en pujar expectatives, el punt torna a desplaçar-se i exigix nova millora.",
        stable: "Percepció acumulada: no canvia de colp, es construeix per resultats successius."
      },
      guided: {
        title: "Cas guiat amb avaluació",
        description:
          "Analitza un cas en 3 decisions. Cada decisió modifica paràmetres, expectativa i qualitat percebuda. S'avalua comprensió del model.",
        progress: "Progrés:",
        start: "Iniciar cas",
        apply: "Aplicar decisió",
        selectOption: "Selecciona una opció abans de continuar.",
        notStarted: "Prem “Iniciar cas” per a començar.",
        case: {
          title: "Centre educatiu: millora de la retroalimentació",
          description:
            "Un equip docent detecta que, malgrat treballar molt, l'alumnat percep qualitat irregular. Has de decidir com intervenir en cicles successius."
        },
        steps: {
          step1: {
            prompt: "Pas 1: què prioritzes per a reduir ràpidament la distància inicial?",
            a: "Pujar exigència de resultats sense canviar metodologia.",
            b: "Reforçar claredat i feedback amb ajustos d'aula.",
            c: "Mantindre tot igual i esperar al trimestre següent.",
            feedbackA:
              "Pujar exigència sense suport incrementa expectativa més ràpid que la percepció: sol empitjorar la distància.",
            feedbackB:
              "Bona decisió: millores paràmetres que afecten percepció real i permeten reduir distància amb evidència.",
            feedbackC:
              "Sense canvis, la percepció quasi no evoluciona i el cicle perd capacitat de millora."
          },
          step2: {
            prompt: "Pas 2: després d'una lleu millora, com gestiones la subjectivitat de la qualitat?",
            a: "Usar una mitjana global única per a tot l'alumnat.",
            b: "Diferenciar grups i arreplegar expectatives específiques.",
            c: "Eliminar enquestes i mesurar només qualificacions.",
            feedbackA:
              "La mitjana única pot ocultar poblacions amb necessitats diferents i esbiaixar la reflexió.",
            feedbackB:
              "Bona decisió: reconeix la dimensió subjectiva i evita esbiaixos per dilució de perfils.",
            feedbackC:
              "Reduir la informació a una sola mètrica limita l'aprenentatge del cicle."
          },
          step3: {
            prompt: "Pas 3: apareix sobrecompliment puntual (P > E). Què fas?",
            a: "Consolidar i planificar una nova meta, anticipant expectatives més altes.",
            b: "Tancar el procés perquè ja s'ha arribat a qualitat màxima.",
            c: "Pujar expectativa al màxim sense canviar capacitat de l'equip.",
            feedbackA:
              "Bona decisió: el model assumix que en sobrecomplir es fixen noves expectatives i convé planificar el següent salt.",
            feedbackB:
              "El procés no es tanca: la percepció de qualitat és dinàmica i torna a desplaçar-se.",
            feedbackC:
              "Elevar expectatives sense reforçar capacitat sol reobrir una distància alta en el cicle següent."
          }
        },
        feedbackStart:
          "Cas iniciat. Aplica decisions i observa com canvia la distància entre expectativa i percepció.",
        summaryPending: "Completa els 3 passos per a obtindre l'avaluació final.",
        summaryTitle: "Resultat de l'avaluació",
        scoreLabel: "Puntuació",
        summaryHigh: "Domini alt del model: connectes subjectivitat, distància i evolució temporal.",
        summaryMedium: "Domini mitjà: entens la distància, però encara hi ha marge en anàlisi de context i expectatives.",
        summaryLow: "Domini inicial: convé revisar la relació entre intervenció, percepció acumulada i expectatives dinàmiques."
      }
    },
    parasuramanSimple: {
      title: "Definició de Qualitat",
      subtitle:
        "Esta definició de qualitat està basada en la referència bibliogràfica: 📑 Parasuraman et al. (1985). <i>Journal of Marketing</i>, 49(4), 41–50. DOI: 10.2307/1251430",
      badge: "Pas a pas",
      advancedLink: "Obrir Parasuraman Avançat (demo)",
      readerTitle: "Lectura guiada",
      animationTitle: "Animació del model",
      parameterTitle: "Paràmetres que van conformant la percepció",
      parameterApprox: "Estos valors numèrics són només una aproximació expressada matemàticament.",
      counter: "Pas {{current}} de {{total}}",
      actions: {
        prev: "Arrere",
        next: "Avant"
      },
      labels: {
        perceived: "Percebut",
        expected: "Esperat"
      },
      metrics: {
        perceived: "Percebut",
        qualityPoint: "Qualitat (índex)",
        expected: "Esperat",
        distance: "Distància |P-E|"
      },
      parameters: {
        p1: "Paràmetre 1",
        p2: "Paràmetre 2",
        p3: "Paràmetre 3"
      },
      steps: {
        s1: "La qualitat és un punt de localització variable en una línia que va des del que nosaltres percebem fins al que esperem.",
        s2: "Com més s'acosta el punt al que esperem: percebem major qualitat.",
        s3: "Com més s'allunya el punt del que esperem percebem menor qualitat.",
        s4: "La qualitat és una percepció subjectiva.",
        s5: "La qualitat és inversament proporcional a la distància entre el que obtenim i el que esperem.",
        s6: "La percepció de la qualitat no és instantània. Es va conformant per l'obtenció de resultats de diferents paràmetres.",
        s7: "El punt pot estar per damunt del que esperem; es complixen amb escreix totes les nostres expectatives.",
        s8: "Però automàticament fixem unes altres més altes, i el punt torna a estar per davall."
      },
      hints: {
        s1: "Primer marc: línia base i dos punts de referència (percebut i esperat).",
        s2: "El punt percebut s'aproxima a l'esperat: augmenta la qualitat.",
        s3: "El punt percebut s'allunya de l'esperat: disminuïx la qualitat.",
        s4: "La posició percebuda pot variar segons la mirada de cada persona o grup.",
        s5: "Observa com en augmentar distància |P-E|, la qualitat percebuda cau.",
        s6: "Els paràmetres no impacten de colp: el seu efecte s'acumula progressivament.",
        s7: "Quan P supera E, la qualitat continua augmentant.",
        s8: "Les expectatives pugen i tornen a obrir distància, reiniciant la millora."
      },
      notes: {
        s1: "Referència inicial del model.",
        s2: "Distància curta entre P i E.",
        s3: "Distància llarga entre P i E.",
        s4: "Dues persones poden interpretar la mateixa experiència de manera diferent.",
        s5: "Relació inversa: més distància, menys qualitat percebuda.",
        s6: "Efecte acumulat de resultats sobre diversos paràmetres.",
        s7: "Sobrecompliment puntual detectat.",
        s8: "Nova expectativa més alta: el cicle torna a activar-se."
      }
    },
    parasuramanAdvanced: {
      title: "Parasuraman Avançat",
      subtitle: "Versió completa amb simulació dinàmica, mode guiat i avaluació.",
      lock: {
        title: "Accés restringit",
        subtitle: "Introdueix la contrasenya per a obrir la versió avançada.",
        input: "Contrasenya",
        action: "Entrar",
        hint: "Contrasenya de demostració requerida.",
        error: "Contrasenya incorrecta. Prova amb \"demo\"."
      }
    },
    pdca: {
      title: "PDCA",
      subtitle:
        "Mòdul base per a formació de gestors: primer definició guiada, després visual principal del cicle i finalment malfuncionaments.",
      aliases: {
        title: "Múltiples denominacions:",
        a1: "Cercle de Deming (de William Edwards Deming, basat en Walter Andrew Shewhart)",
        a2: "Cercle de Gabo",
        a3: "Cicle de millora",
        a4: "Espiral de millora contínua",
        a5: "PDCA (de l'anglés: Plan Do Check Act)"
      },
      badges: {
        definition: "Definició guiada",
        visual: "Visual del cicle",
        malfunctions: "Malfuncionaments"
      },
      actions: {
        prev: "Arrere",
        next: "Avant",
        prevPhase: "Fase anterior",
        nextPhase: "Fase següent",
        prevType: "Tipus anterior",
        nextType: "Tipus següent"
      },
      definition: {
        title: "1) Lectura guiada del concepte",
        lead: "Llig la definició del cicle en passos curts i ordenats.",
        counter: "Pas {{current}} de {{total}}",
        steps: {
          s1: "PDCA és un cicle de millora contínua amb quatre fases connectades.",
          s2: "Planificar defineix objectius, criteris i el disseny de la intervenció.",
          s3: "Desenvolupar executa allò planificat amb els recursos i rols disponibles.",
          s4: "Comprovar avalua resultats i contrasta evidència amb objectius.",
          s5: "Actuar ajusta decisions, consolida allò que funciona i corregix allò que no.",
          s6: "En equips, el valor del cicle depén de la connexió real entre persones, informació i fases."
        }
      },
      visual: {
        title: "2) Visual principal del cicle",
        lead: "El paquet d'informació ha de passar per les quatre fases sense perdre traçabilitat.",
        input: "Entrada:",
        process: "Procés:",
        output: "Eixida:",
        handoff: "Traspàs visible entre fases:",
        handoffCaption: "Eixida de {{from}} → Entrada de {{to}}",
        handoffOutput: "Eixida actual",
        handoffInput: "Entrada següent"
      },
      phase: {
        plan: {
          label: "Planificar",
          short: "P",
          input: "diagnòstic, necessitats i metes",
          process: "prioritzar, dissenyar, assignar responsables",
          output: "pla operatiu amb criteris d'èxit"
        },
        do: {
          label: "Desenvolupar",
          short: "D",
          input: "pla operatiu",
          process: "implementació en aula/centre i coordinació",
          output: "evidències d'execució i primers resultats"
        },
        check: {
          label: "Comprovar",
          short: "C",
          input: "evidències i resultats",
          process: "anàlisi, contrast d'objectius i detecció de bretxes",
          output: "judici fonamentat sobre eficàcia"
        },
        act: {
          label: "Actuar",
          short: "A",
          input: "judici fonamentat",
          process: "ajustar decisions, estandarditzar millores, corregir falles",
          output: "nou punt de partida per al cicle següent"
        }
      },
      malfunctions: {
        title: "3) Tipus de malfuncionament",
        lead: "Tres falles freqüents redueixen el potencial del PDCA encara que aparentment el cicle continue girant.",
        effectLabel: "Efecte observat:",
        potential: "Potencial de millora conservat: {{value}}%",
        type1: {
          title: "Tipus 1 · Fluïdesa d'informació deficient",
          description:
            "La informació arriba incompleta, esbiaixada o tard entre fases. El cicle es completa, però decideix amb base fràgil.",
          effect: "Es manté l'activitat, però baixa la qualitat de les decisions."
        },
        type2: {
          title: "Tipus 2 · Salt de fase",
          description:
            "S'omet una fase crítica (normalment reflexió o ajust) i es repetix el cicle sense renovació real.",
          effect: "Hi ha repetició operativa sense millora estructural."
        },
        type3: {
          title: "Tipus 3 · Actors desconnectats del cicle",
          description:
            "Qui executa una fase no compartix propòsit ni lògica del cicle complet, o no va participar en la planificació.",
          effect: "Apareix compliment parcial i la millora es fragmenta."
        }
      },
      games: {
        title: "4) Minijocs de pràctica",
        lead: "Dos exercicis ràpids per a fixar la seqüència del cicle i el traspàs d'informació entre fases.",
        actions: {
          shuffle: "Mesclar",
          check: "Comprovar",
          reset: "Reiniciar"
        },
        order: {
          title: "Joc 1 · Ordena les fases",
          instructions: "Reordena les fases fins a obtindre la seqüència correcta del cicle.",
          moveUp: "Pujar fase",
          moveDown: "Baixar fase",
          feedbackSuccess: "Ordre correcte: Planificar → Desenvolupar → Comprovar → Actuar.",
          feedbackPartial: "Tens {{correct}} de {{total}} fases en posició correcta."
        },
        match: {
          title: "Joc 2 · Relaciona la informació entre fases",
          instructions:
            "Per a cada bloc d'informació, indica entre quines dos fases circula (eixida de la primera i entrada de la següent).",
          infoLabel: "Informació transferida",
          selectPlaceholder: "Selecciona tram del cicle",
          linkTemplate: "{{from}} → {{to}}",
          feedbackIncomplete: "Completa totes les relacions abans de comprovar.",
          feedbackSuccess: "Relació correcta en els 4 trams del cicle.",
          feedbackPartial: "Has encertat {{correct}} de {{total}} relacions."
        }
      }
    },
    pvca: {
      title: "PVCA",
      subtitle:
        "Model de canvi amb quatre condicions que han d'estar presents perquè el procés avance amb coherència.",
      actions: {
        reset: "Reiniciar"
      },
      badges: {
        definition: "Mode definició",
        malfunction: "Mode malfuncionament"
      },
      modes: {
        definition: "Definició",
        malfunction: "Malfuncionament"
      },
      lead: {
        definition: "Fes clic en cada caixa per a veure la definició d'eixa fase.",
        malfunction: "Fes clic en una caixa per a simular la seua absència i vore el problema associat."
      },
      problem: {
        definition: "Selecciona una fase per a obrir la seua definició.",
        malfunction: "Selecciona una fase per a eliminar-la temporalment del model."
      },
      phases: {
        pressure: {
          label: "Pressió per al canvi",
          definition: "Evidències i raons que mostren que continuar igual ja no millora resultats."
        },
        vision: {
          label: "Visió compartida",
          definition: "Imatge comuna del canvi desitjat i de per què val la pena assumir-lo."
        },
        capacity: {
          label: "Capacitat per a canviar",
          definition: "Recursos, competències i organització necessaris per a executar el canvi."
        },
        actions: {
          label: "Primeres accions",
          definition: "Primers passos concrets que convertixen la intenció en avanç real."
        }
      },
      malfunctions: {
        pressure: "Falta 1: Mai serà important",
        vision: "Falta 2: Falta de consens i implicació",
        capacity: "Falta 3: Frustració i impotència",
        actions: "Falta 4: Mai serà urgent, no arrancarà"
      },
      modal: {
        close: "Tancar"
      }
    },
    placeholder: {
      shared: {
        now: "Estructura preparada",
        back: "Tornar al selector"
      },
      pdca: {
        title: "PDCA",
        subtitle: "Model planificat: pendent de contingut i simulació detallada amb tu.",
        next: "En la fase següent afegirem rols, flux d'informació i casos de coordinació de cicle col·lectiu."
      },
      pvca: {
        title: "PVCA i malfuncionaments",
        subtitle: "Model planificat: pendent de contingut i simulació detallada amb tu.",
        next: "En la fase següent afegirem els malfuncionaments tipus 1, 2 i 3 amb decisions guiades i diagnòstic."
      }
    }
  },
  en: {
    nav: {
      home: "Selector",
      parasuraman: "Quality",
      pdcaTeam: "PDCA",
      pvca: "PVCA"
    },
    common: {
      language: "Language"
    },
    footer: {
      author: "Designed by José Luis Miralles Bono",
      repo: "GitHub repository",
      horchata: "Buy me a horchata"
    },
    home: {
      hero: {
        title: "Interactive lab",
        subtitle: "Simulators for educational quality improvement training.",
        block1: {
          title: "Layered learning",
          body: "Step-by-step version to understand the definition and advanced version to practice decisions."
        },
        block2: {
          title: "Shared criteria",
          body: "A single visual language and unified metrics to compare models side by side."
        },
        block3: {
          title: "GitHub Pages ready",
          body: "Static architecture, fast delivery, no backend required."
        }
      },
      simulators: {
        title: "Simulation selector"
      },
      cards: {
        parasuraman: {
          status: "Live",
          title: "Parasuraman quality definition",
          description:
            "Follow the definition sentence by sentence with synchronized animation of perceived, expected and quality points.",
          mode: "Step-by-step + advanced",
          cta: "Open"
        },
        pdca: {
          status: "Live",
          title: "PDCA",
          description:
            "Guided concept reading, main cycle visual, and malfunction types in one interactive module.",
          mode: "Definition + cycle + failures",
          cta: "Open"
        },
        pvca: {
          status: "Live",
          title: "PVCA and malfunction types",
          description: "Pressure for change, Shared vision, Capacity, and First actions with absence-based failures.",
          mode: "Definition + malfunction",
          cta: "Open"
        }
      },
      roadmap: {
        title: "Development roadmap",
        item1: "Parasuraman: step-by-step mode + advanced mode protected with demo password.",
        item2: "PDCA: roles and information flow across collective cycles.",
        item3: "PVCA: interactive malfunction diagnosis and impact analysis."
      }
    },
    parasuraman: {
      title: "Parasuraman Quality Simulator",
      subtitle:
        "Perceived quality is modeled as the distance between what we expect and what we obtain. This tool represents its subjective, cumulative, and dynamic behavior.",
      tag: {
        simple: "Simple mode",
        guided: "Guided case",
        evaluation: "With assessment"
      },
      mode: {
        simple: "Simple mode",
        guided: "Guided mode"
      },
      controls: {
        expected: "Expectation (E)",
        adaptationRate: "Expectation increase rate after over-performance",
        adaptationToggle: "Increase expectations automatically when P > E",
        parameters: "Perception-building parameters",
        weight: "Weight",
        observed: "Observed result"
      },
      actions: {
        run: "Run cycle",
        auto: "Auto 5 cycles",
        reset: "Reset"
      },
      visual: {
        expectedMark: "E",
        perceivedMark: "P"
      },
      metrics: {
        expected: "Expectation",
        perceived: "Perception",
        distance: "Distance",
        quality: "Quality"
      },
      history: {
        cycle: "Cycle",
        expected: "E",
        perceived: "P",
        distance: "|E-P|",
        quality: "Q",
        empty: "No executed cycles yet."
      },
      parameters: {
        outcomes: "Learning outcomes",
        clarity: "Instructional clarity",
        support: "Support",
        feedback: "Useful feedback",
        equity: "Equity of attention"
      },
      insight: {
        neutral: "Tune parameters and run cycles to observe how perception is built over time.",
        excellent: "Low distance: perceived quality is close to the current expectation.",
        low: "High distance: perception is far from expectations. Intervention redesign is needed.",
        aboveExpected:
          "Over-performance detected: once expectations rise, the point moves again and demands a new improvement cycle.",
        stable: "Accumulated perception: it does not shift instantly, it emerges from repeated outcomes."
      },
      guided: {
        title: "Guided case with assessment",
        description:
          "Analyze a 3-decision case. Each decision changes parameters, expectation, and perceived quality. Model understanding is evaluated.",
        progress: "Progress:",
        start: "Start case",
        apply: "Apply decision",
        selectOption: "Select an option before continuing.",
        notStarted: "Press “Start case” to begin.",
        case: {
          title: "School case: improving feedback",
          description:
            "A teaching team sees uneven perceived quality despite high effort. You must choose interventions across consecutive cycles."
        },
        steps: {
          step1: {
            prompt: "Step 1: what do you prioritize to reduce the initial gap quickly?",
            a: "Increase demands without changing methodology.",
            b: "Strengthen clarity and feedback with classroom adjustments.",
            c: "Keep everything unchanged and wait for next term.",
            feedbackA:
              "Raising demands without support increases expectations faster than perception and usually widens the gap.",
            feedbackB:
              "Good choice: you improve variables that affect actual perception and can reduce distance with evidence.",
            feedbackC:
              "Without change, perception barely evolves and the cycle loses improvement power."
          },
          step2: {
            prompt: "Step 2: after slight improvement, how do you handle quality subjectivity?",
            a: "Use a single average for the whole student body.",
            b: "Differentiate groups and collect specific expectations.",
            c: "Remove surveys and track grades only.",
            feedbackA:
              "A single average can hide group differences and bias the reflection phase.",
            feedbackB:
              "Good choice: it acknowledges subjectivity and avoids profile dilution bias.",
            feedbackC:
              "Reducing information to one metric limits learning inside the cycle."
          },
          step3: {
            prompt: "Step 3: temporary over-performance appears (P > E). What now?",
            a: "Consolidate gains and plan the next target, anticipating higher expectations.",
            b: "Close the process because maximum quality was reached.",
            c: "Raise expectations to maximum without increasing team capacity.",
            feedbackA:
              "Good choice: the model assumes over-performance resets expectations, so planning the next jump is key.",
            feedbackB:
              "The process should not close: perceived quality is dynamic and the point shifts again.",
            feedbackC:
              "Raising expectations without increasing capacity often reopens a large gap in the next cycle."
          }
        },
        feedbackStart:
          "Case started. Apply decisions and observe how the expectation-perception distance changes.",
        summaryPending: "Complete the 3 steps to get your final assessment.",
        summaryTitle: "Assessment result",
        scoreLabel: "Score",
        summaryHigh: "High mastery: you connected subjectivity, distance, and temporal evolution.",
        summaryMedium: "Medium mastery: distance is understood, but context and expectation dynamics need refinement.",
        summaryLow: "Initial mastery: review intervention links with cumulative perception and dynamic expectations."
      }
    },
    parasuramanSimple: {
      title: "Quality Definition",
      subtitle:
        "This quality definition is based on the bibliographic reference: 📑 Parasuraman et al. (1985). <i>Journal of Marketing</i>, 49(4), 41–50. DOI: 10.2307/1251430",
      badge: "Step by step",
      advancedLink: "Open Parasuraman Advanced (demo)",
      readerTitle: "Guided reading",
      animationTitle: "Model animation",
      parameterTitle: "Parameters shaping perceived quality over time",
      parameterApprox: "These numeric values are only a mathematically expressed approximation.",
      counter: "Step {{current}} of {{total}}",
      actions: {
        prev: "Back",
        next: "Next"
      },
      labels: {
        perceived: "Perceived",
        expected: "Expected"
      },
      metrics: {
        perceived: "Perceived",
        qualityPoint: "Quality (index)",
        expected: "Expected",
        distance: "Distance |P-E|"
      },
      parameters: {
        p1: "Parameter 1",
        p2: "Parameter 2",
        p3: "Parameter 3"
      },
      steps: {
        s1: "Quality is a variable location point on a line that goes from what we perceive to what we expect.",
        s2: "The closer the point is to what we expect, the higher quality we perceive.",
        s3: "The farther the point is from what we expect, the lower quality we perceive.",
        s4: "Quality is a subjective perception.",
        s5: "Quality is inversely proportional to the distance between what we obtain and what we expect.",
        s6: "Quality perception is not instant. It is gradually shaped by results across different parameters.",
        s7: "The point can be above what we expected; all expectations are exceeded.",
        s8: "But we automatically set higher expectations, and the point falls below again."
      },
      hints: {
        s1: "Baseline setup: one line and two reference points (perceived and expected).",
        s2: "Perceived point moves closer to expected: quality rises.",
        s3: "Perceived point moves away from expected: quality drops.",
        s4: "Point interpretation can vary by observer or group context.",
        s5: "As |P-E| increases, perceived quality decreases.",
        s6: "Parameter effects are cumulative, not instantaneous.",
        s7: "When P exceeds E, quality keeps increasing.",
        s8: "Expectations rise and reopen the gap, reactivating improvement."
      },
      notes: {
        s1: "Initial model reference.",
        s2: "Short distance between P and E.",
        s3: "Long distance between P and E.",
        s4: "Different people can interpret the same experience differently.",
        s5: "Inverse relation: more distance, less perceived quality.",
        s6: "Cumulative effect from multiple parameters.",
        s7: "Temporary over-performance detected.",
        s8: "Higher new expectation: the cycle starts again."
      }
    },
    parasuramanAdvanced: {
      title: "Parasuraman Advanced",
      subtitle: "Complete version with dynamic simulation, guided mode, and assessment.",
      lock: {
        title: "Restricted access",
        subtitle: "Enter the password to open the advanced version.",
        input: "Password",
        action: "Enter",
        hint: "Demo password required.",
        error: "Wrong password. Try \"demo\"."
      }
    },
    pdca: {
      title: "PDCA",
      subtitle:
        "Core manager-training module: guided definition first, then the main cycle visual, and finally malfunction types.",
      aliases: {
        title: "Also known as:",
        a1: "Deming Cycle (from William Edwards Deming, based on Walter Andrew Shewhart)",
        a2: "Gabo Cycle",
        a3: "Improvement cycle",
        a4: "Continuous improvement spiral",
        a5: "PDCA (from English: Plan Do Check Act)"
      },
      badges: {
        definition: "Guided definition",
        visual: "Cycle visual",
        malfunctions: "Malfunctions"
      },
      actions: {
        prev: "Back",
        next: "Next",
        prevPhase: "Previous phase",
        nextPhase: "Next phase",
        prevType: "Previous type",
        nextType: "Next type"
      },
      definition: {
        title: "1) Guided concept reading",
        lead: "Read the cycle definition in short, ordered steps.",
        counter: "Step {{current}} of {{total}}",
        steps: {
          s1: "PDCA is a continuous improvement cycle with four connected phases.",
          s2: "Plan defines goals, criteria, and intervention design.",
          s3: "Do executes what was planned with available roles and resources.",
          s4: "Check evaluates results and contrasts evidence against goals.",
          s5: "Act adjusts decisions, consolidates what works, and corrects what does not.",
          s6: "In teams, cycle value depends on real links between people, information, and phases."
        }
      },
      visual: {
        title: "2) Main cycle visual",
        lead: "The information package must flow across all four phases with traceability.",
        input: "Input:",
        process: "Process:",
        output: "Output:",
        handoff: "Visible handoff between phases:",
        handoffCaption: "Output from {{from}} → Input to {{to}}",
        handoffOutput: "Current output",
        handoffInput: "Next input"
      },
      phase: {
        plan: {
          label: "Plan",
          short: "P",
          input: "diagnosis, needs, and targets",
          process: "prioritize, design, assign responsibilities",
          output: "operational plan with success criteria"
        },
        do: {
          label: "Do",
          short: "D",
          input: "operational plan",
          process: "classroom/school implementation and coordination",
          output: "execution evidence and first outcomes"
        },
        check: {
          label: "Check",
          short: "C",
          input: "evidence and outcomes",
          process: "analysis, target contrast, and gap detection",
          output: "evidence-based judgment on effectiveness"
        },
        act: {
          label: "Act",
          short: "A",
          input: "evidence-based judgment",
          process: "adjust decisions, standardize improvements, fix failures",
          output: "new baseline for the next cycle"
        }
      },
      malfunctions: {
        title: "3) Malfunction types",
        lead: "Three common failures reduce PDCA potential even when the cycle appears to keep running.",
        effectLabel: "Observed effect:",
        potential: "Preserved improvement potential: {{value}}%",
        type1: {
          title: "Type 1 · Poor information flow",
          description:
            "Information arrives incomplete, biased, or late across phases. The cycle closes, but decisions are weakly grounded.",
          effect: "Activity continues, but decision quality drops."
        },
        type2: {
          title: "Type 2 · Phase skipping",
          description:
            "A critical phase is omitted (usually reflection or adjustment), and the cycle repeats without true renewal.",
          effect: "Operational repetition occurs without structural improvement."
        },
        type3: {
          title: "Type 3 · Actors disconnected from the cycle",
          description:
            "People executing a phase do not share the full-cycle rationale, or were excluded from planning.",
          effect: "Partial compliance appears and improvement becomes fragmented."
        }
      },
      games: {
        title: "4) Practice mini-games",
        lead: "Two quick exercises to consolidate cycle order and information handoff between phases.",
        actions: {
          shuffle: "Shuffle",
          check: "Check",
          reset: "Reset"
        },
        order: {
          title: "Game 1 · Order the phases",
          instructions: "Reorder the phases until the cycle sequence is correct.",
          moveUp: "Move phase up",
          moveDown: "Move phase down",
          feedbackSuccess: "Correct order: Plan → Do → Check → Act.",
          feedbackPartial: "You have {{correct}} of {{total}} phases in the correct position."
        },
        match: {
          title: "Game 2 · Match information to phase links",
          instructions:
            "For each information block, choose between which two phases it flows (output of the first and input of the next).",
          infoLabel: "Transferred information",
          selectPlaceholder: "Select cycle link",
          linkTemplate: "{{from}} → {{to}}",
          feedbackIncomplete: "Complete all matches before checking.",
          feedbackSuccess: "Correct matching on all 4 cycle links.",
          feedbackPartial: "You matched {{correct}} of {{total}} links correctly."
        }
      }
    },
    pvca: {
      title: "PVCA",
      subtitle:
        "Change model with four conditions that must be present for the process to move forward coherently.",
      actions: {
        reset: "Reset"
      },
      badges: {
        definition: "Definition mode",
        malfunction: "Malfunction mode"
      },
      modes: {
        definition: "Definition",
        malfunction: "Malfunction"
      },
      lead: {
        definition: "Click each box to see that phase definition.",
        malfunction: "Click one box to simulate its absence and view the related problem."
      },
      problem: {
        definition: "Select a phase to open its definition.",
        malfunction: "Select a phase to temporarily remove it from the model."
      },
      phases: {
        pressure: {
          label: "Pressure for change",
          definition: "Evidence and reasons showing that staying the same no longer improves results."
        },
        vision: {
          label: "Shared vision",
          definition: "Common picture of the desired change and why it is worth committing to."
        },
        capacity: {
          label: "Capacity to change",
          definition: "Resources, capabilities, and organization required to execute the change."
        },
        actions: {
          label: "First actions",
          definition: "First concrete steps that turn intention into real progress."
        }
      },
      malfunctions: {
        pressure: "Missing 1: It will never feel important",
        vision: "Missing 2: Lack of consensus and commitment",
        capacity: "Missing 3: Frustration and powerlessness",
        actions: "Missing 4: It will never feel urgent, it will not take off"
      },
      modal: {
        close: "Close"
      }
    },
    placeholder: {
      shared: {
        now: "Scaffold ready",
        back: "Back to selector"
      },
      pdca: {
        title: "PDCA",
        subtitle: "Planned model: content and detailed simulation will be built with you next.",
        next: "Next phase will add role flows, information transfer, and collective-cycle coordination cases."
      },
      pvca: {
        title: "PVCA and malfunctions",
        subtitle: "Planned model: content and detailed simulation will be built with you next.",
        next: "Next phase will add type 1, 2, and 3 malfunction scenarios with guided diagnosis."
      }
    }
  }
};

const languageLabelMap = {
  es: "Español",
  ca: "Valencià",
  en: "English"
};

function readPath(dictionary, key) {
  return key.split(".").reduce((value, fragment) => {
    if (value && typeof value === "object") {
      return value[fragment];
    }
    return undefined;
  }, dictionary);
}

function interpolate(raw, params) {
  if (typeof raw !== "string") {
    return raw;
  }
  return raw.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, token) => {
    if (Object.hasOwn(params, token)) {
      return String(params[token]);
    }
    return "";
  });
}

function detectDefaultLanguage() {
  const browserLang = (navigator.language || "es").slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGUAGES.includes(browserLang)) {
    return browserLang;
  }
  return "es";
}

let currentLanguage = (() => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage access issues and keep default fallback.
  }
  return detectDefaultLanguage();
})();

export function getSupportedLanguages() {
  return [...SUPPORTED_LANGUAGES];
}

export function getLanguageLabel(languageCode) {
  return languageLabelMap[languageCode] || languageCode;
}

export function getCurrentLanguage() {
  return currentLanguage;
}

export function t(key, params = {}) {
  const dictionary = dictionaries[currentLanguage] || dictionaries.es;
  const direct = readPath(dictionary, key);
  if (typeof direct !== "undefined") {
    return interpolate(direct, params);
  }
  const fallback = readPath(dictionaries.es, key);
  if (typeof fallback !== "undefined") {
    return interpolate(fallback, params);
  }
  return key;
}

export function setCurrentLanguage(languageCode) {
  if (!SUPPORTED_LANGUAGES.includes(languageCode)) {
    return;
  }
  currentLanguage = languageCode;
  try {
    window.localStorage.setItem(STORAGE_KEY, languageCode);
  } catch {
    // Ignore storage issues and keep runtime language state.
  }
  window.dispatchEvent(
    new CustomEvent("pdca:language-change", {
      detail: {
        language: languageCode
      }
    })
  );
}

export function translateDocument(root = document) {
  const textNodes = root.querySelectorAll("[data-i18n]");
  textNodes.forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) {
      return;
    }
    node.textContent = t(key);
  });

  const htmlNodes = root.querySelectorAll("[data-i18n-html]");
  htmlNodes.forEach((node) => {
    const key = node.getAttribute("data-i18n-html");
    if (!key) {
      return;
    }
    node.innerHTML = t(key);
  });

  const titleNodes = root.querySelectorAll("[data-i18n-title]");
  titleNodes.forEach((node) => {
    const key = node.getAttribute("data-i18n-title");
    if (!key) {
      return;
    }
    node.setAttribute("title", t(key));
  });

  const placeholderNodes = root.querySelectorAll("[data-i18n-placeholder]");
  placeholderNodes.forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    if (!key) {
      return;
    }
    node.setAttribute("placeholder", t(key));
  });

  document.documentElement.lang = currentLanguage;
}
