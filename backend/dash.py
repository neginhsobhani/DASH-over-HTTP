import sys

import ffmpeg_streaming

video_files = sys.argv[1:]

for video_file in video_files:
    video = ffmpeg_streaming.input('./media/raw/' + video_file + '.mp4')
    dash = video.dash(ffmpeg_streaming.Formats.h264())
    dash.auto_generate_representations()
    dash.output('./media/dash/' + video_file + '/dash.mpd')
