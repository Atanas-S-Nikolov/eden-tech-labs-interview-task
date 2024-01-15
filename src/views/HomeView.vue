<template>
  <main>
    <section class="images_section">
      <img id="planets" src="../assets/planets.svg" alt="Planets"/>
      <img id="earth" src="../assets/earth-icon.svg" alt="Earth"/>
    </section>
    <section class="title_section">
      <h1>Astronomy App</h1>
      <h2>View Astronomy images every day.</h2>
    </section>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  #planets {
    width: 250px;
    transform: translate(-25%, -75%);
  }

  #earth {
    width: 450px;
  }

  .title_section {
    line-height: .6;
  }

  .title_section h2 {
    color: gray;
  }

  @media (max-width: 1350px) {
    #planets {
      width: 150px;
      transform: translate(-25%, -100%);
    }

    #earth {
      width: 350px;
    }
  }

  @media (max-width: 1010px) {
    main {
      flex-direction: column;
      text-align: center;
      font-size: medium;
    }

    #planets {
      display: none;
    }
  }
</style>
