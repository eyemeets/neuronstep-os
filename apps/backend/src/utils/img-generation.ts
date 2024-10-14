import type { CourseGenStructure, CourseOutlineChapterSchema, CourseOutlineSubtopicSchema } from '@repo/shared-types'
import type { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { uploadImageToFirebase } from 'src/services/firestore'
import { generateDalleImage } from 'src/services/openai'

export async function createCourseImg(params: CourseGenStructure, user: UserRecord) {
  // Step 1: Generate course image
  const prompt = params.outline.img_prompt

  if (!prompt) {
    return `"params.outline.img_prompt" is: "${prompt}"`
  }
  const imgUrl = await generateDalleImage(prompt)
  
  if (!imgUrl) {
    throw new Error('Course image was undefined')
  }
  
  // Step 2: Upload course image to Firebase Storage
  const courseImagePath = `users/${user.uid}/${params.objective.objective_id}/cover-${params.outline.id}.png`
  const courseImageFirebaseUrl = await uploadImageToFirebase(imgUrl, courseImagePath)

  return courseImageFirebaseUrl
}

export async function createChapterImg(params: CourseGenStructure, chapter: CourseOutlineChapterSchema, user: UserRecord) {
  const prompt = chapter.img_prompt

  if (!prompt) {
    return `"chapter.img_prompt" is: "${prompt}"`
  }

  const imgUrl = await generateDalleImage(prompt)

  if (!imgUrl) {
    throw new Error('Chapter image was undefined')
  }

  const chapterImagePath = `users/${user.uid}/${params.objective.objective_id}/cover-${chapter.id}.png`
  const chapterImageFirebaseUrl = await uploadImageToFirebase(imgUrl, chapterImagePath)

  return chapterImageFirebaseUrl
}

export async function createSubtopicImg(params: CourseGenStructure, subtopic: CourseOutlineSubtopicSchema, user: UserRecord) {
  const prompt = subtopic.img_prompt

  if (!prompt) {
    return `"subtopic.img_prompt" is: "${prompt}"`
  }
  
  const imgUrl = await generateDalleImage(prompt)

  if (!imgUrl) {
    throw new Error('Chapter image was undefined')
  }
  const subtopicImagePath = `users/${user.uid}/${params.objective.objective_id}/cover-${subtopic.id}.png`
  const subtopicImageFirebaseUrl = await uploadImageToFirebase(imgUrl, subtopicImagePath)

  return subtopicImageFirebaseUrl
}
