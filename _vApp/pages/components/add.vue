<template>
    <div>
        <div id="_metas">
            <div class="_metas_other1 flex align-center">
                <div class="title">Component</div>
            </div>
            <div id="_metas_other" class="flex align-center flex-end">
                <v-btn
                    to="/component/list"
                    color="info"
                >
                    <v-icon left>mdi-view-list</v-icon>
                    list
                </v-btn>
            </div>
        </div>
        <v-card class="pa-5">
            <div class="title">Data</div>
            <div class="flex row-wrap _row">
                <v-text-field
                    label="Name"
                    @blur="nameBlur"
                    v-model="component.name"
                ></v-text-field>
                <v-text-field
                    label="Table"
                    v-model="component.table"
                ></v-text-field>
                <v-text-field
                    label="Variable"
                    v-model="component.variable"
                ></v-text-field>
                <v-text-field
                    label="Slug"
                    v-model="component.slug"
                ></v-text-field>
            </div>
            <div class="title">Config</div>
            <div class="">
                <v-switch
                    inset
                    label="Create/Edit Screen"
                    color="success"
                    v-model="component.create"
                ></v-switch>
                <v-switch
                    inset
                    label="List screen"
                    color="success"
                    v-model="component.list"
                ></v-switch>
                <v-switch
                    inset
                    label="Generate Meta Fields"
                    color="success"
                    class="mr-10"
                    v-model="component.metas"
                ></v-switch>
                <v-switch
                    inset
                    label="Reset Component"
                    color="success"
                    v-model="component.reset"
                ></v-switch>
            </div>
            <div class="title">Fields</div>
            <div class="_componentField" :key="index" v-for="(fieldCount, index) in jsFields">
                <div class="flex">
                    <v-btn
                        small
                        color="error"
                        @click="removeField(fieldCount)"
                    >
                        <v-icon left>mdi-delete-outline</v-icon>
                        Remove
                    </v-btn>
                </div>
                <div class="flex row-wrap _row">
                    <div class="fill">
                        <v-select
                            v-model="component.column_type[fieldCount]"
                            :items="columnTypes"
                            label="Column Type"
                        >
                        </v-select>
                        <v-select
                            v-model="component.relationship_type[fieldCount]"
                            :items="relationshipType"
                            label="Relationship Type"
                            v-if="relationshipFields"
                        >
                        </v-select>
                    </div>
                    <div class="fill">
                        <v-text-field
                            v-model="component.field_name[fieldCount]"
                            label="Field Name"
                            persistent-hint
                            autocomplete="nope"
                        ></v-text-field>
                        <v-select
                            v-model="component.input_type[fieldCount]"
                            label="Input Type"
                            :items="inputTypes"
                        ></v-select>
                        <v-text-field
                            v-model="component.class[fieldCount]"
                            label="HTML Class"
                            autocomplete="nope"
                        ></v-text-field>
                    </div>
                    <div class="fill">
                        <v-select
                            v-model="component.required[fieldCount]"
                            label="Required"
                            :items="selectDefaultValues"
                        >
                        </v-select>
                        <v-select
                            v-model="component.listing[fieldCount]"
                            label="Show on Listing Page"
                            :items="selectDefaultValues"
                        >
                        </v-select>
                        <v-select
                            v-model="component.fillable[fieldCount]"
                            label="Fillable"
                            :items="selectDefaultValues"
                        >
                        </v-select>
                    </div>
                </div>
            </div>
            <v-btn
                small
                color="success"
                class="my-5"
                @click="addField"
            >
                <v-icon>mdi-plus</v-icon>
                Add
            </v-btn>
            <div id="_bottomAction">
                <div></div>
                <v-btn
                    large
                    color="info"
                    @click="generateComp"
                    :loading="$store.state.loading"
                >
                    <v-icon>mdi-content-save-outline</v-icon>
                    Save & Generate
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            component: {
                slug: null,
                table: null,
                variable: null,
                create: true,
                list: true,
                column_type: [],
                relationship_type: [],
                field_name: [],
                input_type: [],
                class: [],
                required: [],
                listing: [],
                fillable: []
            },
            relationshipFields: false,
            fieldsCounter: 0,
            jsFields: [],
            selectDefaultValues: [
               { 'text': 'Yes', 'value': 1 },
               { 'text': 'No', 'value': 0 },
            ],
            inputTypes: [
               {
                   text: 'Text',
                   value: 'text'
               },
               {
                   text: 'Textarea',
                   value: 'textarea'
               },
               {
                   text: 'Number',
                   value: 'number'
               },
               {
                   text: 'Phone',
                   value: 'tel'
               },
               {
                   text: 'Select Dropdown',
                   value: 'select'
               },
               {
                   text: 'Radio',
                   value: 'radio'
               },
               {
                   text: 'Checkbox',
                   value: 'checkbox'
               },
               {
                   text: 'File',
                   value: 'file'
               },
               {
                   text: 'File',
                   value: 'file'
               }
            ],
            columnTypes: [
                {
                    text: 'Varchar',
                    value: 'string'
                },
                {
                    text: 'Integer',
                    value: 'integer'
                },
                {
                    text: 'Auto Incremental',
                    value: 'incremental'
                },
                {
                    text: 'Big Integer',
                    value: 'bigInteger'
                },
                {
                    text: 'Text',
                    value: 'text'
                },
                {
                    text: 'Long Text',
                    value: 'Longtext'
                },
                {
                    text: 'Datetime',
                    value: 'datetime'
                },
                {
                    text: 'Date',
                    value: 'date'
                },
                {
                    text: 'Time',
                    value: 'time'
                },
                {
                    text: 'Decimal',
                    value: 'decimal'
                },
                {
                    text: 'Relationship',
                    value: 'relationship'
                }
            ],
            relationshipType: [
                {
                    text: 'Belongs To',
                    value: 'belongsTo'
                },
                {
                    text: 'Belongs To Many',
                    value: 'belongsToMany'
                },
                {
                    text: 'Has Many',
                    value: 'hasMany'
                },
            ]
        }
    },
    created () {
        if (this.jsFields && !this.jsFields.length) {
            this.jsFields[0] = 0;
        }
    },
    methods: {
        generateComp () {
            this.$store.commit('loading', true);

            this.$axiosx.post('/component/add').then((res) => {

            });
        },
        nameBlur () {
            if (!this.component.name) {
                return;
            }
            var name = this.component.name;
            var slug = name.replace(' ', '/');
            var table = name.replace(' ', '_');
            console.log(name);
            this.component.table = table.toLowerCase();
            this.component.variable = table.toLowerCase();
            this.component.slug = slug.toLowerCase();
            console.log(this.component);
        },
        addField () {
            this.fieldsCounter += 1;
            this.jsFields.push(this.fieldsCounter);
        },
        removeField(countNumber) {
            this.jsFields.splice(countNumber, 1);
        }
    },
    watch: {
        jsFields (val) {
            console.log(this.jsFields);
        },
        'component.column_type' (val) {
            console.log(val);
            if (val == 'relationship') {
                this.relationshipFields = true;
            } else {
                this.relationship_type = null;
                this.relationshipFields = false;
            }
        }
    }
}
</script>
