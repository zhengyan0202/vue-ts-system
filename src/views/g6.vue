<template>
  <div class="container-box">
    <div id="g6-container"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import G6 from "@antv/g6";

@Component({
  components: {},
})
export default class Index extends Vue {
  graph: any;
  g6Data = {};

  created() {
    this.initData();
  }

  mounted() {
    this.$nextTick(() => {
      this.initG6();
    });
  }

  initData() {
    this.g6Data = {
      nodes: [
        {
          id: "1",
          label: "Company1",
        },
        {
          id: "2",
          label: "Company2",
        },
        {
          id: "3",
          label: "Company3",
        },
        {
          id: "4",
          label: "Company4",
        },
        {
          id: "5",
          label: "Company5",
        },
        {
          id: "6",
          label: "Company6",
        },
        {
          id: "7",
          label: "Company7",
        },
        {
          id: "8",
          label: "Company8",
        },
        {
          id: "9",
          label: "Company9",
        },
      ],
      edges: [
        {
          source: "1",
          target: "2",
          data: {
            type: "A",
            amount: "100,000 Yuan",
            date: "2019-08-03",
          },
        },
        {
          source: "1",
          target: "3",
          data: {
            type: "B",
            amount: "100,000 Yuan",
            date: "2019-08-03",
          },
        },
        {
          source: "2",
          target: "5",
          data: {
            type: "C",
            amount: "100,000 Yuan",
            date: "2019-08-03",
          },
        },
        {
          source: "5",
          target: "6",
          data: {
            type: "B",
            amount: "100,000 Yuan",
            date: "2019-08-03",
          },
        },
        {
          source: "3",
          target: "4",
          data: {
            type: "C",
            amount: "100,000 Yuan",
            date: "2019-08-03",
          },
        },
        {
          source: "4",
          target: "7",
          data: {
            type: "B",
            amount: "100,000 Yuan",
            date: "2019-08-03",
          },
        },
        {
          source: "1",
          target: "8",
          data: {
            type: "B",
            amount: "100,000 Yuan",
            date: "2019-08-03",
          },
        },
        {
          source: "1",
          target: "9",
          data: {
            type: "C",
            amount: "100,000 Yuan",
            date: "2019-08-03",
          },
        },
      ],
    };
  }

  initG6() {
    this.registerNode();
    let g6Container:HTMLElement | null = document.getElementById("g6-container");
    const width = g6Container?.offsetWidth || 1000;
    const height = g6Container?.offsetHeight || 800;
    this.graph = new G6.Graph({
      container: "g6-container",
      renderer: "svg",
      width,
      height,
      layout: {
        type: "dagre",
        rankdir: "LR",
        nodesep: 30,
        ranksep: 100,
      },
      modes: {
        default: ["drag-canvas", 'zoom-canvas'],
      },
      defaultNode: {
        type: "round-rect",
        labelCfg: {
          style: {
            fill: "#000000A6",
            fontSize: 10,
          },
        },
        style: {
          stroke: "#72CC4A",
          width: 150,
        },
      },
      defaultEdge: {
        type: "polyline",
      },
    });

    this.graph.data(this.g6Data);
    this.graph.render();
  }

  registerNode() {
    G6.registerNode(
      'round-rect',
      {
        drawShape: function drawShape(cfg: any , group: any ) {
          const width = cfg.style.width;
          const stroke = cfg.style.stroke;
          const rect = group.addShape('rect', {
            attrs: {
              x: -width / 2,
              y: -15,
              width,
              height: 30,
              radius: 15,
              stroke,
              lineWidth: 1.2,
              fillOpacity: 1,
            },
            name: 'rect-shape',
          });
          group.addShape('circle', {
            attrs: {
              x: -width / 2,
              y: 0,
              r: 3,
              fill: stroke,
            },
            name: 'circle-shape',
          });
          group.addShape('circle', {
            attrs: {
              x: width / 2,
              y: 0,
              r: 3,
              fill: stroke,
            },
            name: 'circle-shape2',
          });
          return rect;
        },
        getAnchorPoints: function getAnchorPoints() {
          return [
            [0, 0.5],
            [1, 0.5],
          ];
        },
        update: function update(cfg:any, item) {
          const group = item.getContainer();
          const children = group.get('children');
          const node = children[0];
          const circleLeft = children[1];
          const circleRight = children[2];

          const stroke = cfg.style.stroke;

          if (stroke) {
            node.attr('stroke', stroke);
            circleLeft.attr('fill', stroke);
            circleRight.attr('fill', stroke);
          }
        },
      },
      'single-node',
    );
  }
}
</script>

<style lang="scss" scoped>
.container-box,
#g6-container {
  width: 100%;
  height: 100%;
}
</style>
