import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: "Title of Skill",
      type: 'string',
    }),
    defineField({
      name: 'progress',
      title: 'Progress',
      description: "Progress of Skill",
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options:{
        hotspot: true,
      }
    }),
    
  ],

})
