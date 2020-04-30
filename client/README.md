# Clientside

## Create CRUD application with VUE-CLI and Vuetify

> ### Just download new vue-cli project then add vuetify. (make sure you have vue-cli installed in your computer)

```
vue create client
#navigate to new project directory
cd client
```

Add vuetify

```
vue add vuetify
```

Add axios and uuid (used in this example)

```
yarn add axios uuidv4
```


Then just edit the **App.vue** component. _I just copy the example in vuetify data-table and remove other fields then important is that we connect to our **Server API** services using axios.._


```
<template>
  <v-app>
    <template>
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>My CRUD</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on"
                  >New Item</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Dessert name"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </template>
  </v-app>
</template>

<script>
import { uuid } from "uuidv4";
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    url: "https://hqvwxefkv7.execute-api.us-east-2.amazonaws.com/prod/records",
    // url: "http://localhost:3000/records",
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get(this.url).then((res) => {
        this.desserts = res.data;
      });
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        axios.delete(`${this.url}/${item.id}`, { data: item }).then((res) => {
          this.desserts.splice(index, 1);
          console.log(res.data);
        });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      console.log(this.editedItem, this.editedIndex);
      if (this.editedIndex > -1) {
        // Edit
        axios.put(this.url, this.editedItem).then((res) => {
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
          console.log(res.data);
          this.close();
        });
      } else {
        // Add
        this.editedItem.id = uuid();
        console.log(this.editedItem);
        this.desserts.push(this.editedItem);
        axios.post(this.url, this.editedItem).then((res) => {
          console.log(res.data);
          this.close();
        });
      }
    },
  },
};
</script>
```

>Notice that in **_data_** we have two url. We can switch over the two(local development or, for production)

No further explanation for code, it was pretty basic.

Run development mode:

```
npm run serve
# OR
yarn serve
```

Build for production:

```
npm run build
# OR
yarn build
```

## Deploy application to S3

### Create S3 Bucket

* Got to [AWS-S3](https://console.aws.amazon.com/s3/home?region=us-east-2). Then click **Create bucket**

![s32](https://lh3.googleusercontent.com/qjFW-PNpTY6iDP73KqvYuHBDIxmFqC_3wd6puEcfMJRVp6fRh5GFeM0oexzCKPueXyCqvZPXYn90Ab9f4as0qB4kKsjOsG8wYBH7yd609DwlG2k_1LYlDFOhXDqxp6iejVMLoH7Svw)

1. Bucket name: **tutorialhrd** (example)
2. Uncheck _Block all public access_ (for tutorial's simplicity)
3. Click **Create bucket**

* Then Upload your files in newly created bucket.

![s33](https://lh3.googleusercontent.com/sBvfjRItCnd1fahH-qAAFT_bbrBmzdm67DHDPf5hvgyp5zqQHnx3bvN22U80s5fdbqHmGpGSMEBXTZNjZP6-ZQmjW-mM6wBRWaxMCL_8K8Y3cNMXwW6Xd9c6Lw-YTUTrLY8Zf9Kqqg)

1. Select your bucket
2. Drag and drop all files (inside dist directory)
3. Click **Upload**

* Make all files **Public**

![s34](https://lh3.googleusercontent.com/4fd2Xbhp2heDDkB5y_jQMSxaN0430j1uQ3_5LqDJMa0fPj2urMUbPHqngMVa5PVeBJOFv9C5whZ7vH7g8Z1Gf4d87b0UW5vAlqiGPnfTsr-a845GNdffqs0vqFJVoyHhgEmkmQr8Ug)

1. Select all files
2. Click action > select **Make public**
3. Click **Make public**

* Enable Static website hosting

![s35](https://lh3.googleusercontent.com/ej3nwVBSZ7J_T_7bM4bVuWAoQNvDZJmwGI-FbgfC-779gHcy6gntes4oKN6STEFEvExgdIXE8O-nY0Npi5t-r0c6TjNrw0wQ_3IYLRFR1ye9ktfm8UkdJ1oa7MHT6avG1fu7lVdOHA)

1. Go to **Properties**
2. Select **Static website hosting**
3. Index and Error Document should be **index.html**
4. Click **Save**

That's it, you can now get your new website url (under Static website hosting).

[demo](http://tutorialhrd.s3-website.us-east-2.amazonaws.com)
