<template>
    <div>
      <label for="rowCount">Enter number of rows:</label>
      <input type="number" id="rowCount" v-model="rowCount" @change="updateRows">
  
      <table>
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td v-for="(cell, colIndex) in row" :key="colIndex">
              <input type="text" v-model="rows[rowIndex][colIndex]">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rowCount: 0,
        columns: ['Column 1', 'Column 2'], // Add more column names here
        rows: [],
      };
    },
    methods: {
      updateRows() {
        this.rows = Array.from({ length: parseInt(this.rowCount) }, () => Array(this.columns.length).fill(''));
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your table styling here */
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  th, td {
    border: 1px solid black;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  